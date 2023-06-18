<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RubbishRequest;
use App\Models\Rubbish;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\DB;

class RubbishController extends Controller
{
    use ApiResponse;

    public function index(){
        $response = Rubbish::all();
        return $this->apiSuccess($response);
    }

    public function percentage(){
        $response = Rubbish::select(
                'rubbishes.id as rubbish_id', 'category', 'max_weight',
                DB::raw('IFNULL(SUM(weight), 0) as weight'),
                DB::raw('IFNULL((SUM(weight) / max_weight * 100), 0) as percent'),
                DB::raw('IF(((SUM(weight) / max_weight) * 100) < 100, "Belum Penuh", "Penuh") as status')
            )
            ->leftJoin('trashes', 'trashes.rubbish_id', '=', 'rubbishes.id')
            ->groupBy('rubbishes.id', 'category', 'max_weight')
            ->get();
        return $this->apiSuccess($response);
    }

    public function store(RubbishRequest $request)
    {
        $validated = $request->validated();
        $response = Rubbish::create([
            'uniq_id' => time(),
            'category' => $validated['category'],
            'max_weight' => $validated['max_weight'],
        ]);

        return $this->apiSuccess($response);
    }

    public function show($id)
    {
        $response = Rubbish::where('id', $id)->first();
        return $this->apiSuccess($response);
    }

    public function update(RubbishRequest $request, $id)
    {
        $request->validated();
        Rubbish::where('id', $id)->update($request->all());
        $response = Rubbish::where('id', $id)->first();
        return $this->apiSuccess($response);

    }

    public function destroy($id)
    {
        $response = Rubbish::where('id', $id)->delete();
        return $this->apiSuccess($response);
    }
}
