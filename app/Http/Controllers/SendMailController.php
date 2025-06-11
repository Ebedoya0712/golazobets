namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendMailController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        Mail::raw('Este es un correo de prueba enviado desde SendMailController.', function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Correo de prueba');
        });

        return response()->json(['message' => 'Correo enviado correctamente']);
    }
}
