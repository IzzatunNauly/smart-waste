<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrashFull;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class TrashFullController extends Controller
{
    use ApiResponse;

    public function index(){
        $response = TrashFull::with('user','rubbish')->get();
        return $this->apiSuccess($response);
    }
}
