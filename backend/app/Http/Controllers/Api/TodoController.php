<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    /**
     * 获取当前用户的所有待办事项
     */
    public function index(): JsonResponse
    {
        $todos = auth()->user()->todos()->latest()->get();
        return response()->json(['data' => $todos]);
    }

    /**
     * 创建新的待办事项
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $todo = auth()->user()->todos()->create($validated);

        return response()->json([
            'message' => '创建成功',
            'data' => $todo
        ], 201);
    }

    /**
     * 更新待办事项
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        // 确保只能更新自己的待办事项
        if ($todo->user_id !== auth()->id()) {
            return response()->json(['message' => '无权操作'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'completed' => 'sometimes|required|boolean'
        ]);

        $todo->update($validated);

        return response()->json([
            'message' => '更新成功',
            'data' => $todo
        ]);
    }

    /**
     * 删除待办事项
     */
    public function destroy(Todo $todo): JsonResponse
    {
        // 确保只能删除自己的待办事项
        if ($todo->user_id !== auth()->id()) {
            return response()->json(['message' => '无权操作'], 403);
        }

        $todo->delete();

        return response()->json([
            'message' => '删除成功'
        ]);
    }
}
