<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * 用户注册
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // 验证请求数据
        $request->validate([
            'username' => 'required|string|unique:users,username|min:3|max:255',
            'password' => 'required|string|min:6|confirmed',
            'email' => 'nullable|email|unique:users,email',
        ]);

        // 创建用户
        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'email' => $request->email,
        ]);

        // 创建令牌
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => '注册成功',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * 用户登录
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function login(Request $request)
    {
        // 验证请求数据
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // 查找用户
        $user = User::where('username', $request->username)->first();

        // 验证用户和密码
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['用户名或密码错误'],
            ]);
        }

        // 创建新令牌
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => '登录成功',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * 用户登出
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // 删除当前用户的所有令牌
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => '登出成功'
        ]);
    }

    /**
     * 获取当前用户信息
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
