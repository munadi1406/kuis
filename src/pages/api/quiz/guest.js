// import { supabase } from "../../../lib/supabase";
import { supabase } from "@/lib/supabase";




export const POST = async ({ request, cookies }) => {
  const { token, nisn } = await request.json();

  console.log(nisn)
  const {data:nisnCheck,error:nisnError} = await supabase.from('siswa').select('nisn,id_kelas').eq('nisn',nisn).single()
  if (nisnError || !nisnCheck) {
    return new Response(
      JSON.stringify({
        message: "Anda Tidak Terdaftar Sebagai Siswa SDN Pingaran Ulu",
      }),
      { status: 409 }
    );
  }
  // Cek token kuis
  let { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .select("id,id_kelas")
    .eq("token", token)
    .single();
  console.log(quizData)
  if (quizError || !quizData) {
    return new Response(
      JSON.stringify({
        message: "Token Kuis Yang Anda Masukkan Salah",
      }),
      { status: 409 }
    );
  }
  if(nisnCheck.id_kelas !== quizData.id_kelas){
    const {data:kelasName} = await supabase.from('kelas').select('kelas').eq('id',quizData.id_kelas).single();
    return new Response(
        JSON.stringify({
            message: `anda tidak bisa mengerjakan kuis ini karena anda bukan siswa di kelas ${kelasName.kelas}`,
        }),
        { status: 401 }
    );
   }
  
  

  return new Response(
    JSON.stringify({
      message: "Berhasil",
      nisn
    }),
    { status: 200 }
  );
};

