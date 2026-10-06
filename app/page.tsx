"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [language, setLanguage] =
    useState("ara+eng");

  const [fileName, setFileName] =
    useState("output");

  const [fontFamily, setFontFamily] =
    useState("Arial");

  const [fontSize, setFontSize] =
    useState(14);

    const convertImage = async () => {
  if (files.length === 0) return;

  setLoading(true);
  setProgress(0);

  try {
    let fullText = "";

    for (let i = 0; i < files.length; i++) {
      const result = await Tesseract.recognize(
        files[i],
        language
      );

      fullText += result.data.text + "\n\n";

      setProgress(
        Math.round(
          ((i + 1) / files.length) * 100
        )
      );
    }

    setText(fullText);
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
            .split("\n")
            .filter(
              (line) =>
                line.trim() !== ""
            )
            .map(
              (line) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                      font: fontFamily,
                      size:
                        fontSize * 2,
                    }),
                  ],
                })
            ),
        },
      ],
    });

    const blob =
      await Packer.toBlob(doc);

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = `${fileName}.docx`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main
  style={{
    maxWidth: "900px",
    margin: "40px auto",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: "24px",
    boxShadow:
      "0 25px 50px rgba(0,0,0,0.15)",
    color: "#111827",
  }}
>
     <h1
  style={{
    textAlign: "center",
    fontSize: "52px",
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
    color: "#64748b",
    fontSize: "18px",
    marginBottom: "15px",
  }}
>
Word حوّل الصور الى مستندات قابلة للتعديل عن طريق 

</p>   
<label
  style={{
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
      const selectedFiles = Array.from(
        e.target.files || []
      );

      setFiles(selectedFiles);
      setText("");
    }}
  />
</label>

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
      <img
        key={index}
          alt={file.name}
        width={120}
        height={120}
        style={{
          objectFit: "cover",
          borderRadius: "12px",
          border: "1px solid #ddd",
        }}
      />
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
  onChange={(e) =>
    setLanguage(e.target.value)
  }
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
  <option value="ara+eng">
    عربي + English
  </option>
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
  onChange={(e) =>
    setFileName(e.target.value)
  }
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
  نوع الخط
</label>

<select
  value={fontFamily}
  onChange={(e) =>
    setFontFamily(e.target.value)
  }
  style={{
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #000000",
    backgroundColor: "#ffffff",
    color: "#000000",
  }}
>
  <option value="Arial">Arial</option>
  <option value="Calibri">Calibri</option>
  <option value="Times New Roman">
    Times New Roman
  </option>
</select>

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
  onChange={(e) =>
    setFontSize(
      Number(e.target.value)
    )
  }
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
        disabled={
          files.length === 0 ||
          loading
        }
        style={{
          backgroundColor:
            "#2563eb",
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
            <p>
              نسبة الإنجاز: {progress}%
            </p>

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
  padding: "16px",
  borderRadius: "14px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
}}
      >
        تحميل Word
      </button>

      <button
        onClick={() =>
          navigator.clipboard.writeText(
            text
          )
        }
        disabled={!text}
       style={{
  background: "#0e9a38",
  color: "white",
  border: "none",
  padding: "16px",
  borderRadius: "14px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
}}
      >
        نسخ النص
      </button>

      <p>
        عدد الأحرف:
        {" "}
        {text.length}
      </p>

      <textarea
        value={text}
        readOnly
        rows={15}
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
    </main>
  );
}