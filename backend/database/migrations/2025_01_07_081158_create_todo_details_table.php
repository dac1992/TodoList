<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 创建待办事项详情表
     * - description: 文本描述
     * - sub_tasks: 子任务列表（JSON格式）
     */
    public function up(): void
    {
        Schema::create('todo_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('todo_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->json('sub_tasks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_details');
    }
};
