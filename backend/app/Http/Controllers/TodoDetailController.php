<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoDetail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TodoDetailController extends Controller
{
    /**
     * 获取待办事项的详细信息
     */
    public function show(Todo $todo): JsonResponse
    {
        $detail = $todo->detail()->with('attachments')->first();
        return response()->json($detail);
    }

    /**
     * 更新待办事项的详细信息
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'nullable|string',
            'sub_tasks' => 'nullable|array',
            'sub_tasks.*' => 'string'
        ]);

        $detail = $todo->detail()->updateOrCreate(
            ['todo_id' => $todo->id],
            $validated
        );

        return response()->json($detail);
    }

    /**
     * 删除待办事项的详细信息
     */
    public function destroy(Todo $todo): JsonResponse
    {
        $todo->detail()->delete();
        return response()->json(['message' => '详细信息已删除']);
    }
} 