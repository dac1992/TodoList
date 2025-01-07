<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attachment extends Model
{
    protected $fillable = [
        'todo_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size'
    ];

    /**
     * 获取关联的待办事项
     */
    public function todo(): BelongsTo
    {
        return $this->belongsTo(Todo::class);
    }
} 