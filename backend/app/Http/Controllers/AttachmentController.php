<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    /**
     * 上传附件
     */
    public function store(Request $request, Todo $todo): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 最大 10MB
        ]);

        $file = $request->file('file');
        $path = $file->store('attachments/' . $todo->id);

        $attachment = $todo->attachments()->create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $file->getClientMimeType(),
            'file_size' => $file->getSize()
        ]);

        return response()->json($attachment);
    }

    /**
     * 下载附件
     */
    public function download(Attachment $attachment)
    {
        return Storage::download(
            $attachment->file_path,
            $attachment->file_name
        );
    }

    /**
     * 删除附件
     */
    public function destroy(Attachment $attachment): JsonResponse
    {
        Storage::delete($attachment->file_path);
        $attachment->delete();

        return response()->json(['message' => '附件已删除']);
    }
} 