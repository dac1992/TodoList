<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TodoDetail extends Model
{
    protected $fillable = [
        'todo_id',
        'description',
        'sub_tasks'
    ];

    protected $casts = [
        'sub_tasks' => 'array'
    ];

    /**
     * 获取关联的待办事项
     */
    public function todo(): BelongsTo
    {
        return $this->belongsTo(Todo::class);
    }

    /**
     * 获取关联的附件列表
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class);
    }
} 