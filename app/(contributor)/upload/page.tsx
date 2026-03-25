export default function UploadPage() {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Upload Assets</h1>
      
      {/* Upload wizard steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">1</div>
            <span className="ml-2">Select Files</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
            <span className="ml-2">Upload Progress</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">3</div>
            <span className="ml-2">Add Metadata</span>
          </div>
        </div>
      </div>
      
      {/* Drag and drop area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">📁</div>
        <h2 className="text-xl font-semibold mb-2">Drag & drop files here</h2>
        <p className="text-gray-600 mb-4">or click to browse</p>
        <p className="text-sm text-gray-500">
          Supported: JPG, PNG, SVG, MP4, MOV (max 4GB)<br />
          Up to 100 files per batch
        </p>
        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg">
          Browse Files
        </button>
      </div>
      
      {/* Upload info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 Resumable upload enabled - your uploads will persist across page reloads
        </p>
      </div>
    </div>
  );
}
