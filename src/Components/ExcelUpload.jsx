import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel } from "react-icons/fa";

export default function ExcelUpload() {
  const onDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [["Name", "Brand Name", "Dosage", "Unit Price", "Stock", "Status"]];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Medicines");
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "medicine_template.xlsx");
  };

  const onFileUpload = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("Uploaded Data:", jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileUpload,
    accept: ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    multiple: false,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Upload Medicines</h2>
      <div className="flex flex-col space-y-4">
        <button
          onClick={onDownloadTemplate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <FaFileExcel className="mr-2" /> Download Excel Template
        </button>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-600">Drop the Excel file here...</p>
          ) : (
            <p className="text-gray-600">Drag & drop Excel file here, or click to select</p>
          )}
        </div>
      </div>
    </div>
  );
}