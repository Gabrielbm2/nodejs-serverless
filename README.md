# 🖼️ Image Resizing with Serverless — Personal Project  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project was created to practice **serverless architecture** concepts using modern and efficient technologies for high-performance image processing.

## ⚙️ Technologies Used

- 🔹 **Node.js** + **TypeScript**
- 🔹 **AWS Lambda**
- 🔹 **DynamoDB** for metadata storage
- 🔹 **S3** for file storage
- 🔹 **Sharp** for image resizing and optimization
- 🔹 **SST (Serverless Stack)** for infrastructure organization and deployment

---

## 💡 Objective

Allow image resizing with:

- **Predefined sizes** (SD, HD, Full HD, 4K)
- **Custom dimensions** with aspect ratio validation to prevent distortion

In addition, the resizing process also applies **automatic visual enhancements**:

- Increased brightness
- Enhanced saturation
- Sharpened edges

This ensures optimized images with a professional look, even after resizing.

---

## 🔒 Why build my own Lambda?

Although there are public solutions (such as Lambdas using ImageMagick or pre-built Sharp layers), I chose to develop my own Lambda function to:

- Have **full control over behavior**
- Implement **custom validations** (e.g., reject resolutions that distort the image)
- Learn how to orchestrate SST and AWS in practice

---

## 🧠 Key Learnings

- Cold start optimization and response time tuning
- Efficient metadata storage using DynamoDB
- Modular organization with SST for clean and scalable deployments

---

## 📦 Use Cases

This Lambda function can be reused or adapted for:

- CMSs and publishing systems
- E-commerce platforms needing product image resizing
- AI pipelines that require optimized images
- Any app that needs to generate thumbnails on demand

---

## 🧑‍💻 Source Code

This project is **open source**!  
🔗 [Check out the repository](https://github.com/Gabrielbm2/nodejs-serverless)

---

## 🪪 License

Distributed under the MIT License. See the [LICENSE](LICENSE) file for details.
