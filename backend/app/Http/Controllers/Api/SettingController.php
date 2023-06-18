<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SettingController extends Controller
{
    use ApiResponse;

    public function show_profile($user_id){
        $user = User::where('id', $user_id)->first();
        return $this->apiSuccess($user);
    }

    public function update_profile(ProfileUpdateRequest $request, $id)
    {
        $validated = $request->validated();

        User::where('id', $id)->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        $user = User::where('id', $id)->first();

        return $this->apiSuccess($user);
    }

    public function update_password(PasswordUpdateRequest $request, $id){
        $validated = $request->validated();

        $check = User::where('id', $id)->first();

        if (!(Hash::check($validated['old_password'], $check->password))) {
            return $this->apiError('Your old password doesn`t match!', 400);
        }

        User::where('id', $id)->update([
            'password' => Hash::make($validated['password']),
        ]);

        $user = User::where('id', $id)->first();

        return $this->apiSuccess($user);
    }
}
