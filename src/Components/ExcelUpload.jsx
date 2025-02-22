import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaUpload } from "react-icons/fa";
import { useState } from "react";

export default function ExcelUpload() {
  const [data, setData] = useState([]);

  // Download Excel Template
  const onDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["Name", "Manufacturing Date", "Expiry Date", "Dosage", "Form", "Unit Price", "Brand Name", "Quantity", "Reorder Level"],
    ]; // Header row
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Medicines");

    // Generate and save file
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "medicine_template.xlsx");
  };

  // Handle File Upload
  const onFileUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Uploaded Data:", jsonData);
      setData(jsonData); // Set the uploaded data to state
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle Submit (Send Data to Backend)
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/medicines/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Stringify the data
      });

      if (response.ok) {
        alert("Medicines uploaded successfully!");
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.error || "Please try again."}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  // Dropzone Configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileUpload,
    accept: ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Correct accept prop
    multiple: false,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Upload Medicines</h2>
      <div className="flex flex-col space-y-4">
        {/* Download Template Button */}
        <button
          onClick={onDownloadTemplate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <FaFileExcel className="mr-2" /> Download Excel Template
        </button>

        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-600">Drop the Excel file here...</p>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <FaUpload className="text-3xl text-blue-500" />
              <p className="text-gray-600">Drag & drop Excel file here, or click to select</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
        >
          Submit Data
        </button>
      </div>
    </div>
  );
}