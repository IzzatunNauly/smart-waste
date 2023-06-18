<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TrashRequest;
use App\Models\Rubbish;
use App\Models\Trash;
use App\Models\TrashFull;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TrashController extends Controller
{
    use ApiResponse;

    public function index(){
        $response = Trash::with('rubbish')->get();
        return $this->apiSuccess($response);
    }

    public function store(TrashRequest $request){
        $validated = $request->validated();
        $response = Trash::create([
            'rubbish_id' => $validated['rubbish_id'],
            'date' => Carbon::now()->format('Y-m-d'),
            'weight' => $validated['weight'],
        ]);

        return $this->apiSuccess($response);
    }

    public function emptyrubbish($rubbish_id){
        $rubbish = Rubbish::where('id', $rubbish_id)->first();
        $trash = Rubbish::select(
                'category',
                DB::raw('SUM(weight) as weight'),
            )
            ->join('trashes', 'trashes.rubbish_id', '=', 'rubbishes.id')
            ->where('rubbishes.id', $rubbish_id)
            ->groupBy('category')
            ->first();
        $response = [
            'user_id' => Auth::user()->id,
            'rubbish_id' => $rubbish_id,
            'uniq_id' => $rubbish->uniq_id,
            'date' => Carbon::now()->format('Y-m-d'),
            'total' => $trash->weight
        ];

        TrashFull::create($response);
        Trash::where('rubbish_id', $rubbish_id)->delete();
        Rubbish::where('id', $rubbish_id)->update([ 'uniq_id' => time() ]);
        return $this->apiSuccess($response);
    }
}
