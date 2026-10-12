"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState("ara+eng");
  const [fileName, setFileName] = useState("output");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(14);
  const [executionTime, setExecutionTime] = useState("");
  const [ocrMode, setOcrMode] = useState("standard");

  const formatMathText = (value: string) => value;

  const convertImage = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setProgress(0);

    try {
      let fullText = "";
      const startTime = Date.now();
      let totalConfidence = 0;

      for (let i = 0; i < files.length; i++) {
        const img = new Image();
        img.src = URL.createObjectURL(files[i]);

        await new Promise((resolve) => {
          img.onload = () => resolve(true);
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) continue;

        canvas.width = img.width * 3;
        canvas.height = img.height * 3;
        ctx.filter = "grayscale(100%) contrast(350%) brightness(120%)";

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const result = await Tesseract.recognize(canvas, language, {
          psm: ocrMode === "columns" ? 3 : 6,
        } as any);

        const pageData = result.data as any;
        totalConfidence += pageData.confidence ?? 0;

        console.log("Confidence:", pageData.confidence);

        const cleanedText = (pageData.text ?? "")
          .replace(/[|]/g, "")
          .replace(/[ ]{2,}/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .trim();

        const words = Array.isArray(pageData.words) ? pageData.words : [];
        console.log("Detected words:", words.length);

        const formatMathText = (text: string) => {
  return text
    .replace(/sqrt/gi, "√")
    .replace(/1\/2/g, "½")
    .replace(/1\/4/g, "¼")
    .replace(/3\/4/g, "¾")
    .replace(/x2/g, "x²")
    .replace(/x3/g, "x³")
    .replace(/pi/gi, "π")
    .replace(/theta/gi, "θ")
    .replace(/alpha/gi, "α")
    .replace(/beta/gi, "β")
    .replace(/delta/gi, "δ");
};
const tableLikeText = cleanedText
  .replace(/\s{3,}/g, "\t");

const formattedText =
  formatMathText(tableLikeText);
        fullText +=
          "\n-----------------\n" +
          "Page " +
          (i + 1) +
          "\n-----------------\n" +
          formatMathText +
          "\n\n";

        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      const avgConfidence = totalConfidence / files.length;
      console.log("Average Confidence:", avgConfidence);

      const endTime = Date.now();
      const time = ((endTime - startTime) / 1000).toFixed(1);

      setExecutionTime(time);
      setText(fullText.trim());
    } finally {
      setLoading(false);
    }
  };

  const downloadWord = async () => {
    if (!text) return;

    const doc = new Document({
      sections: [
        {
          children: text
            .split(/\n\s*\n/)
            .filter((line) => line.trim() !== "")
            .map((line) => {
              const isHeading = line.length < 50;
              const lineHasMath = /[√=+\-÷×]/.test(line);

              return new Paragraph({
                heading: isHeading ? HeadingLevel.HEADING_1 : undefined,
                alignment: "right",
                children: [
                  new TextRun({
                    text: line,
                    font: fontFamily,
                    size: fontSize * 2,
                    bold: lineHasMath,
                  }),
                ],
              });
            }),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${fileName}.docx`;

    a.click();

    URL.revokeObjectURL(url);
  };

  const hasMath = /[√=+\-÷×]/.test(text);

  return (
    <main
      style={{
        maxWidth: "1600px",
        width: "95%",
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
       background:
  "linear-gradient(135deg, #ffffff 0%, #eef4ff 100%)",
        borderRadius: "24px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
        color: "#ffffff",
      }}
    >
      <div
  style={{
    fontSize: "70px",
    textAlign: "center",
  }}
>
  📄
</div>
      <h1
        style={{
          textAlign: "center",
         fontSize: "64px",
letterSpacing: "-2px",
textShadow: "0 4px 10px rgba(37,99,235,0.25)",
          color: "#2563eb",
          fontWeight: "800",
          marginBottom: "10px",
        }}
      >
        Scan2Work AI
      </h1>
<p
  style={{
    textAlign: "center",
    color: "#16a34a",
    fontWeight: "bold",
  }}
>
  OCR Accuracy Optimized
</p>
      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "18px",
          marginBottom: "15px",
        }}
      >
        Word 
        حوّل الصور الى مستندات قابلة للتعديل عن طريق
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <label
          style={{
            display: "block",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "14px",
            borderRadius: "12px",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          اختر الصور

          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);

              setFiles((prev) => {
                const newFiles = selectedFiles.filter(
                  (newFile) =>
                    !prev.some(
                      (existingFile) =>
                        existingFile.name === newFile.name &&
                        existingFile.size === newFile.size
                    )
                );

                return [...prev, ...newFiles];
              });
            }}
          />
        </label>
      </div>

      <div
        onDragOver={(e) => {
    e.preventDefault();
  }}
  onDrop={(e) => {
    e.preventDefault();

    const droppedFiles = Array.from(
      e.dataTransfer.files
    ).filter((file) =>
      file.type.startsWith("image/")
    );

  setFiles((prev) => {
  const newFiles = droppedFiles.filter(
    (newFile) =>
      !prev.some(
        (existingFile) =>
          existingFile.name === newFile.name &&
          existingFile.size === newFile.size
      )
  );

  return [...prev, ...newFiles];
}); 
  }}
  style={{
    background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    padding: "50px",
    borderRadius: "16px",
    border: "2px dashed #60a5fa",
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
    fontSize: "22px",
    transition: "0.3s",
  }}
>
  📁 اسحب الصور هنا أو اضغط على "اختر الصور"

  <div
    style={{
      marginTop: "12px",
      fontSize: "14px",
      color: "#64748b",
    }}
  >
    يدعم JPG - PNG - JPEG
  </div>
</div>

<div
  style={{
    background: "#eff6ff",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #bfdbfe",
    fontWeight: "bold",
    color: "#1e3a8a",
    textAlign: "center",
  }}
>
 عدد الصور المختارة: {files.length}

<br />

</div>
      {files.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {files.map((file, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                padding: "10px",
                borderRadius: "14px",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                width={100}
                height={100}
                style={{
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
                alt={file.name}
              />

             <p
  style={{
    marginTop: "8px",
    fontSize: "12px",
    color: "#64748b",
    maxWidth: "120px",
    wordBreak: "break-word",
  }}
>
  {file.name}
</p>

<button
  onClick={() => {
    setFiles(
      files.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );
  }}
  style={{
    marginTop: "8px",
    background: "#ef4444",
    color: "white",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  ✕
</button>
            </div>
          ))}
        </div>
      )}

      <label
        style={{
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        اللغة
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #000000",
          backgroundColor: "#ffffff",
          color: "#030202",
        }}
      >
        <option value="ara">العربية</option>
        <option value="eng">English</option>
        <option value="ara+eng">عربي + English</option>
      </select>

      <label
        style={{
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        اسم ملف Word
      </label>

      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #000000",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      />
      <label
        style={{
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        حجم الخط
      </label>

      <select
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #000000",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
      </select>

      <button
        onClick={convertImage}
        disabled={files.length === 0 || loading}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "12px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? (
          <>
            <p>نسبة الإنجاز: {progress}%</p>

            <div
              style={{
                width: "100%",
                height: "20px",
                background: "#ddd",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#1ae227",
                  borderRadius: "10px",
                  transition: "0.3s",
                }}
              />
            </div>
          </>
        ) : (
          "تحويل الصور"
        )}
      </button>

      <button
        onClick={downloadWord}
        disabled={!text}
        style={{
          background: "#001eff",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "14px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        تحميل Word
      </button>

      <button
        onClick={() => navigator.clipboard.writeText(text)}
        disabled={!text}
        style={{
          background: "#0e9a38",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "14px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        نسخ النص
      </button>
    
<div
  style={{
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "20px",
  }}
>
  <div
    style={{
      background: "#eff6ff",
      padding: "15px",
      borderRadius: "12px",
      minWidth: "140px",
      textAlign: "center",
    }}
  >
    الصور: {files.length}
  </div>

  <div
    style={{
      background: "#eff6ff",
      padding: "15px",
      borderRadius: "12px",
      minWidth: "140px",
      textAlign: "center",
    }}
  >
    الأحرف: {text.length}
  </div>
<div
  style={{
    background: "#eff6ff",
    padding: "15px",
    borderRadius: "12px",
    minWidth: "140px",
    textAlign: "center",
  }}
>
  الوقت: {executionTime}s
</div>
  <div
    style={{
      background: "#eff6ff",
      padding: "15px",
      borderRadius: "12px",
      minWidth: "140px",
      textAlign: "center",
    }}
  >
    اللغة: {language}
  </div>
</div>

<h2
  style={{
    marginTop: "25px",
    textAlign: "center",
    color: "#2563eb",
  }}
>
  النص المستخرج
</h2>
<h2
  style={{
    textAlign: "center",
    color: "#2563eb",
    marginTop: "15px",
  }}
>
  Preview Result
</h2>
{hasMath && (
  <div
    style={{
      background: "#fef3c7",
      color: "#92400e",
      padding: "12px",
      borderRadius: "12px",
      marginBottom: "10px",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Mathematical Expressions Detected
  </div>
)}
      <textarea
        value={text}
        readOnly
        rows={8}
        style={{
          width: "100%",
          borderRadius: "14px",
          border: "1px solid #d1d5db",
          padding: "15px",
          fontSize: "15px",
          backgroundColor: "#ffffff",
          color: "#111827",
        }}
      />
      <hr />

<p
  style={{
    textAlign: "center",
    color: "#64748b",
    marginTop: "10px",
  }}
>
  Scan2Work AI © 2026
</p>
    </main>
  );
}