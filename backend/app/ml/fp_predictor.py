import logging
import os

import joblib
import torch
from transformers import AutoModel, AutoTokenizer

logger = logging.getLogger(__name__)

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
CLASSIFIER_PATH = os.path.join(MODEL_DIR, "fp_classifier.pkl")


class FalsePositivePredictor:
    def __init__(self):
        """Initialize the predictor by loading the ML models if available."""
        self.is_ready = False
        self.classifier = None
        self.tokenizer = None
        self.model = None

        if not os.path.exists(CLASSIFIER_PATH):
            logger.warning(
                f"FP Classifier not found at {CLASSIFIER_PATH}. ML inference will be skipped."
            )
            return

        try:
            self.device = torch.device(
                "cuda"
                if torch.cuda.is_available()
                else "mps"
                if torch.backends.mps.is_available()
                else "cpu"
            )
            logger.info(f"Loading FP Classifier and CodeBERT on {self.device}...")

            self.classifier = joblib.load(CLASSIFIER_PATH)
            self.tokenizer = AutoTokenizer.from_pretrained("microsoft/codebert-base")
            self.model = AutoModel.from_pretrained("microsoft/codebert-base").to(
                self.device
            )
            self.model.eval()

            self.is_ready = True
            logger.info("ML Predictor successfully loaded and ready.")
        except Exception as e:
            logger.error(
                f"Failed to load ML Predictor: {e}. Inference will be skipped."
            )
            self.is_ready = False

    def adjust_scores(self, findings: list[dict]) -> list[dict]:
        if not self.is_ready or not findings:
            return findings

        try:
            texts = []
            for f in findings:
                rule_id = str(f.get("rule_id", "unknown_rule"))
                message = str(f.get("message", ""))
                file_path = str(f.get("file_path", ""))
                texts.append(f"{rule_id} {message} {file_path}")

            all_embeddings = []
            batch_size = 16

            with torch.no_grad():
                for i in range(0, len(texts), batch_size):
                    batch_texts = texts[i : i + batch_size]
                    inputs = self.tokenizer(
                        batch_texts,
                        padding=True,
                        truncation=True,
                        max_length=512,
                        return_tensors="pt",
                    ).to(self.device)
                    outputs = self.model(**inputs)
                    cls_embeddings = outputs.last_hidden_state[:, 0, :]
                    all_embeddings.append(cls_embeddings.cpu())

            X = torch.cat(all_embeddings, dim=0).numpy()

            probs = self.classifier.predict_proba(X)

            fp_index = list(self.classifier.classes_).index(1)

            for i, f in enumerate(findings):
                fp_probability = probs[i][fp_index]

                logger.info(
                    f"Rule: {f.get('rule_id')} | FP Probability: {fp_probability:.2f}"
                )

                if fp_probability > 0.5:
                    current_score = f.get("ml_score")
                    if current_score is None:
                        current_score = 1.0

                    f["ml_score"] = round(current_score * 0.2, 3)

        except Exception as e:
            logger.error(f"Error during ML inference. Skipping downranking. {e}")

        return findings


predictor = FalsePositivePredictor()
