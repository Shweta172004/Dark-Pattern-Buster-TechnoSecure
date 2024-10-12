<h1>Dark Pattern Buster</h1>
<h2>Overview</h2>
<p>Dark Patterns Buster is a project aimed at detecting and classifying manipulative design elements in web and app interfaces known as "dark patterns." These elements trick users into making decisions that they might not otherwise choose, such as hidden fees, forced continuity, or disguised ads. This project leverages deep learning techniques, reinforcement learning with human feedback (RLHF), and multimodal approaches to identify and flag such patterns.</p>
<h2>Features</h2>
<p><ul><b>Multimodal Analysis</b>: Combines both text and image processing using BART, RoBERTa, and CLIP models to classify UI/UX elements.</ul></p>
<p><ul><b>Reinforcement Learning</b>: Fine-tuned with human feedback to improve the accuracy of detecting dark patterns.</ul></p>
<p><ul><b>High Accuracy</b>: Achieved 96% accuracy on text and 80% accuracy on image-based dark pattern detection.</ul></p>
<p><ul><b>Few-Shot Classification</b>: Uses a few-shot learning approach to enhance performance in limited-data scenarios.</ul></p>
<p><ul><b>OCR for Images</b>: Uses object detection and Optical Character Recognition (OCR) to analyze image-based dark patterns in UI/UX elements.</ul></p>
<h2>Technologies</h2>
<p><ul><b>Models</b>:  BART, RoBERTa, CLIP for image classification,YOLO and OCR for UI elements.</ul></p>
<p><ul><b>Frameworks</b>: PyTorch, TensorFlow, Hugging Face Transformers.</ul></p>
<p><ul><b>Other Tools</b>: Reinforcement Learning with Human Feedback (RLHF), Few-Shot Learning.</ul></p>
<h2>Results</h2>
<p><ul><b>Text Detection</b>: Achieved 96% accuracy in identifying dark patterns in text.</ul></p>
<p><ul><b>Image Detection</b>: Achieved 80% accuracy in detecting dark patterns in UI/UX images.</ul></p>
<h2>Future Work</h2>
<p><ul><b>Expand Dataset</b>: Adding more dark patterns to improve model generalization.</ul></p>
<p><ul><b>Improved UI/UX Analysis</b>: : Enhancing the accuracy of image classification through better object detection techniques.</ul></p>

