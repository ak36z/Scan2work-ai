(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tesseract.js/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/docx/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Home() {
    _s();
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ara+eng");
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("output");
    const [fontFamily, setFontFamily] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Arial");
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(14);
    const [executionTime, setExecutionTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [ocrMode, setOcrMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("standard");
    const convertImage = async ()=>{
        if (files.length === 0) return;
        setLoading(true);
        setProgress(0);
        try {
            let fullText = "";
            const startTime = Date.now();
            let totalConfidence = 0;
            for(let i = 0; i < files.length; i++){
                const img = new Image();
                img.src = URL.createObjectURL(files[i]);
                await new Promise((resolve)=>{
                    img.onload = ()=>resolve(true);
                });
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) continue;
                canvas.width = img.width * 3;
                canvas.height = img.height * 3;
                ctx.filter = "grayscale(100%) contrast(350%) brightness(120%)";
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].recognize(canvas, language, {
                    psm: ocrMode === "columns" ? 3 : 6
                });
                const pageData = result.data;
                totalConfidence += pageData.confidence ?? 0;
                console.log("Confidence:", pageData.confidence);
                const cleanedText = (pageData.text ?? "").replace(/[|]/g, "").replace(/[ ]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
                const words = Array.isArray(pageData.words) ? pageData.words : [];
                console.log("Detected words:", words.length);
                const formatMathText = (text)=>text.replace(/sqrt/gi, "√").replace(/1\/2/g, "½").replace(/1\/4/g, "¼").replace(/3\/4/g, "¾").replace(/x2/gi, "x²").replace(/x3/gi, "x³").replace(/pi/gi, "π").replace(/theta/gi, "θ").replace(/alpha/gi, "α").replace(/beta/gi, "β").replace(/delta/gi, "δ");
                const tableLikeText = cleanedText.replace(/\s{3,}/g, "\t");
                const formattedText = formatMathText(tableLikeText);
                fullText += "\n-----------------\n" + "Page " + (i + 1) + "\n-----------------\n" + formattedText + "\n\n";
                setProgress(Math.round((i + 1) / files.length * 100));
            }
            const avgConfidence = totalConfidence / files.length;
            console.log("Average Confidence:", avgConfidence);
            const endTime = Date.now();
            const time = ((endTime - startTime) / 1000).toFixed(1);
            setExecutionTime(time);
            setText(fullText.trim());
        } finally{
            setLoading(false);
        }
    };
    const downloadWord = async ()=>{
        if (!text) return;
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Document"]({
            sections: [
                {
                    children: text.split(/\n\s*\n/).filter((line)=>line.trim() !== "").map((line)=>{
                        const isHeading = line.length < 50;
                        const lineHasMath = /[√=+\-÷×]/.test(line);
                        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Paragraph"]({
                            heading: isHeading ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingLevel"].HEADING_1 : undefined,
                            alignment: "right",
                            children: [
                                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextRun"]({
                                    text: line,
                                    font: fontFamily,
                                    size: fontSize * 2,
                                    bold: lineHasMath
                                })
                            ]
                        });
                    })
                }
            ]
        });
        const blob = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$docx$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Packer"].toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.docx`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const hasMath = /[√=+\-÷×]/.test(text);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            maxWidth: "1600px",
            width: "95%",
            margin: "40px auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            background: "linear-gradient(135deg, #ffffff 0%, #eef4ff 100%)",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgb(255, 255, 255)",
            color: "#ffffff"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: "50px",
                    textAlign: "center",
                    marginBottom: "-10px"
                },
                children: "📄🤖"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    textAlign: "center",
                    fontSize: "56px",
                    letterSpacing: "-2px",
                    textShadow: "0 4px 10px rgba(37,99,235,0.25)",
                    color: "#2563eb",
                    fontWeight: "800",
                    marginBottom: "10px"
                },
                children: "Scan2Work AI"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    textAlign: "center",
                    color: "#16a34a",
                    fontWeight: "bold"
                },
                children: "OCR Accuracy Optimized"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 198,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "18px",
                    marginBottom: "15px"
                },
                children: "Word حوّل الصور الى مستندات قابلة للتعديل عن طريق"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr",
                    gap: "30px",
                    alignItems: "start"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: {
                        display: "block",
                        width: "90%",
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "16px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "bold"
                    },
                    children: [
                        "اختر الصور",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            accept: "image/*",
                            multiple: true,
                            style: {
                                display: "none"
                            },
                            onChange: (e)=>{
                                const selectedFiles = Array.from(e.target.files || []);
                                setFiles((prev)=>{
                                    const newFiles = selectedFiles.filter((newFile)=>!prev.some((existingFile)=>existingFile.name === newFile.name && existingFile.size === newFile.size));
                                    return [
                                        ...prev,
                                        ...newFiles
                                    ];
                                });
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onDragOver: (e)=>{
                    e.preventDefault();
                },
                onDrop: (e)=>{
                    e.preventDefault();
                    const droppedFiles = Array.from(e.dataTransfer.files).filter((file)=>file.type.startsWith("image/"));
                    setFiles((prev)=>{
                        const newFiles = droppedFiles.filter((newFile)=>!prev.some((existingFile)=>existingFile.name === newFile.name && existingFile.size === newFile.size));
                        return [
                            ...prev,
                            ...newFiles
                        ];
                    });
                },
                style: {
                    background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
                    padding: "50px",
                    borderRadius: "16px",
                    border: "2px dashed #60a5fa",
                    fontWeight: "bold",
                    color: "#1e3a8a",
                    textAlign: "center",
                    fontSize: "22px",
                    transition: "0.3s"
                },
                children: [
                    '📁 اسحب الصور هنا أو اضغط على "اختر الصور"',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "12px",
                            fontSize: "14px",
                            color: "#64748b"
                        },
                        children: "يدعم JPG - PNG - JPEG"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 307,
                        columnNumber: 3
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#eff6ff",
                    padding: "15px",
                    borderRadius: "12px",
                    border: "1px solid #bfdbfe",
                    fontWeight: "bold",
                    color: "#1e3a8a",
                    textAlign: "center"
                },
                children: [
                    "عدد الصور المختارة: ",
                    files.length,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 331,
                        columnNumber: 1
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 318,
                columnNumber: 1
            }, this),
            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "center"
                },
                children: files.map((file, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#ffffff",
                            padding: "10px",
                            borderRadius: "14px",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            textAlign: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: URL.createObjectURL(file),
                                width: 100,
                                height: 100,
                                style: {
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    border: "1px solid #ddd"
                                },
                                alt: file.name
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 356,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    marginTop: "8px",
                                    fontSize: "12px",
                                    color: "#64748b",
                                    maxWidth: "120px",
                                    wordBreak: "break-word"
                                },
                                children: file.name
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 368,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setFiles(files.filter((_, fileIndex)=>fileIndex !== index));
                                },
                                style: {
                                    marginTop: "8px",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                },
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 380,
                                columnNumber: 1
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 344,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 335,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    color: "#000000",
                    fontWeight: "bold"
                },
                children: "اللغة"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 408,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: language,
                onChange: (e)=>setLanguage(e.target.value),
                style: {
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #000000",
                    backgroundColor: "#ffffff",
                    color: "#030202"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "ara",
                        children: "العربية"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "eng",
                        children: "English"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "ara+eng",
                        children: "عربي + English"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    color: "#000000",
                    fontWeight: "bold"
                },
                children: "اسم ملف Word"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: fileName,
                onChange: (e)=>setFileName(e.target.value),
                style: {
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #000000",
                    backgroundColor: "#ffffff",
                    color: "#000000"
                }
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    color: "#000000",
                    fontWeight: "bold"
                },
                children: "حجم الخط"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 454,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: fontSize,
                onChange: (e)=>setFontSize(Number(e.target.value)),
                style: {
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #000000",
                    backgroundColor: "#ffffff",
                    color: "#000000"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "12",
                        children: "12"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "14",
                        children: "14"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 475,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "16",
                        children: "16"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 476,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "18",
                        children: "18"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "20",
                        children: "20"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 478,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "24",
                        children: "24"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 479,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: convertImage,
                disabled: files.length === 0 || loading,
                style: {
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold"
                },
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "نسبة الإنجاز: ",
                                progress,
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 498,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: "100%",
                                height: "20px",
                                background: "#ddd",
                                borderRadius: "10px"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: `${progress}%`,
                                    height: "100%",
                                    background: "#1ae227",
                                    borderRadius: "10px",
                                    transition: "0.3s"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 508,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 500,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 497,
                    columnNumber: 11
                }, this) : "تحويل الصور"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 482,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: downloadWord,
                disabled: !text,
                style: {
                    background: "#001eff",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer"
                },
                children: "تحميل Word"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>navigator.clipboard.writeText(text),
                disabled: !text,
                style: {
                    background: "#0e9a38",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "14px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer"
                },
                children: "نسخ النص"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 541,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    marginTop: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#eff6ff",
                            padding: "15px",
                            borderRadius: "12px",
                            minWidth: "140px",
                            textAlign: "center"
                        },
                        children: [
                            "الصور: ",
                            files.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 566,
                        columnNumber: 3
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#eff6ff",
                            padding: "15px",
                            borderRadius: "12px",
                            minWidth: "140px",
                            textAlign: "center"
                        },
                        children: [
                            "الأحرف: ",
                            text.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 578,
                        columnNumber: 3
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#eff6ff",
                            padding: "15px",
                            borderRadius: "12px",
                            minWidth: "140px",
                            textAlign: "center"
                        },
                        children: [
                            "الوقت: ",
                            executionTime,
                            "s"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 589,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#eff6ff",
                            padding: "15px",
                            borderRadius: "12px",
                            minWidth: "140px",
                            textAlign: "center"
                        },
                        children: [
                            "اللغة: ",
                            language
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 600,
                        columnNumber: 3
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 558,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    marginTop: "25px",
                    textAlign: "center",
                    color: "#2563eb"
                },
                children: "النص المستخرج"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 613,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    textAlign: "center",
                    color: "#2563eb",
                    marginTop: "15px"
                },
                children: "Preview Result"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 622,
                columnNumber: 1
            }, this),
            hasMath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "12px",
                    borderRadius: "12px",
                    marginBottom: "10px",
                    textAlign: "center",
                    fontWeight: "bold"
                },
                children: "Mathematical Expressions Detected"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 632,
                columnNumber: 3
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: text,
                readOnly: true,
                rows: 8,
                style: {
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid #d1d5db",
                    padding: "15px",
                    fontSize: "15px",
                    backgroundColor: "#ffffff",
                    color: "#111827"
                }
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 646,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 660,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    textAlign: "center",
                    color: "#64748b",
                    marginTop: "10px"
                },
                children: "Scan2Work AI © 2026"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 662,
                columnNumber: 1
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_s(Home, "PUfJgH8C87BZuYRc4R/5S6XrTY4=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_page_tsx_1s_43kl._.js.map