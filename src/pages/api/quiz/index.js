import { supabase } from "../../../lib/supabase";

const generateCustomToken = (length = 12) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
};
export const POST = async ({ params, request, url }) => {
  const datasss = await request.json();
  
  const { title, desc,kkm, duration, startDate, endDate, token, soalData, mapel, kelas, id_user } = datasss.data
  let quizId;
  let insertedQuestionIds = [];

  try {
    const { data: activeTahunAjaran, error: tahunAjaranError } = await supabase
      .from("tahun_ajaran")
      .select("id")
      .eq("status", true)  // Get the active academic year
      .single();

    if (!activeTahunAjaran) {
      return new Response(
        JSON.stringify({
          message: "Tidak Ada Tahun Ajaran Yang Aktif Saat Ini",
          data: [],
        }),
        { status: 404 }
      );
    }
    let finalToken = token;

    // Jika token tidak disediakan atau kosong, buat token acak
    if (!finalToken) {
      finalToken = generateCustomToken(8);
      const tokenCheck = await supabase.from('quiz').select("*").eq('token', finalToken)
      if (tokenCheck.data.length > 0) {
        finalToken = `${generateCustomToken(8)}${generateCustomToken(4)}`
      }
    }
    
    
    const tokenCheck = await supabase.from('quiz').select("*").eq('token', finalToken)
    if (tokenCheck.data.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Token Sudah Digunakan",
        }),
        { status: 500 }
      );
    }

    const { data: quizData, error: quizError } = await supabase
      .from("quiz")
      .insert({ title, desc,kkm, start_quiz: startDate, end_quiz: endDate, token:finalToken, id_mapel: mapel, id_kelas: kelas, waktu: duration, id_user: id_user ,id_tahun_ajaran:activeTahunAjaran.id})
      .select();

    if (quizError) throw new Error(`Quiz insert error: ${quizError.message}`);

    quizId = quizData[0].id;

    // Prepare soalData array for bulk insert
    const soalInsertData = soalData.map(e => ({
      id_quiz: quizId,
      question: e.question
    }));

    // Insert all questions in bulk
    const { data: questionData, error: questionError } = await supabase
      .from("questions")
      .insert(soalInsertData)
      .select();

    if (questionError) throw new Error(`Question insert error: ${questionError.message}`);

    insertedQuestionIds = questionData.map(q => q.id);

    // Map questions to their respective answers
    const answerInsertData = [];
    questionData.forEach((question, index) => {
      const answers = soalData[index].answerOption.map(answer => ({
        id_question: question.id,
        option: answer.answerOption,
        option_is_true: answer.answerIsTrue
      }));
      answerInsertData.push(...answers);
    });
    // console.log({answerInsertData})

    // Insert all answers in bulk
    const { data: answerData, error: answerError } = await supabase
      .from("options")
      .insert(answerInsertData)
      .select();

    if (answerError) throw new Error(`Answer insert error: ${answerError.message}`);

    return new Response(
      JSON.stringify({
        message: "Kuis Berhasil Dibuat",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Transaction error:', error.message);

    // Rollback operations
    if (quizId) {
      await supabase.from('quiz').delete().eq('id', quizId);
    }

    if (insertedQuestionIds.length > 0) {
      await supabase.from('questions').delete().in('id', insertedQuestionIds);
    }

    return new Response(
      JSON.stringify({
        message: "Gagal Membuat Kuis, rollback dilakukan",
        error: error.message
      }),
      { status: 500 }
    );
  }
};


export const PUT = async ({ params, request, url }) => {
  const datasss = await request.json();
  
  const { title, kkm,desc, duration, startDate, endDate, token, soalData, mapel, kelas, id_user } = datasss.data;
  let quizId = datasss.data.id; // Assuming the quiz ID is provided for updating
  let insertedQuestionIds = [];
  let existingQuestionIds = [];

  try {
    const { data: activeTahunAjaran, error: tahunAjaranError } = await supabase
      .from("tahun_ajaran")
      .select("id")
      .eq("status", true)
      .single();

    if (!activeTahunAjaran) {
      return new Response(
        JSON.stringify({
          message: "Tidak Ada Tahun Ajaran Yang Aktif Saat Ini",
          data: [],
        }),
        { status: 404 }
      );
    }
    
    // Check if quiz ID is provided for updating
    if (!quizId) {
      return new Response(
        JSON.stringify({
          message: "Quiz ID is required for updating",
        }),
        { status: 400 }
      );
    }
    let finalToken = token;

    // Jika token tidak disediakan atau kosong, buat token acak
    if (!finalToken) {
      finalToken = generateCustomToken(8);
      const tokenCheck = await supabase.from('quiz').select("*").eq('token', finalToken)
      if (tokenCheck.data.length > 0) {
        finalToken = `${generateCustomToken(8)}${generateCustomToken(4)}`
      }
    }
    
    
    const tokenCheck = await supabase.from('quiz').select("*").eq('token', finalToken)
    if (tokenCheck.data.length > 1) {
      return new Response(
        JSON.stringify({
          message: "Token Sudah Digunakan",
        }),
        { status: 500 }
      );
    }
    const { error: quizUpdateError } = await supabase
      .from("quiz")
      .update({ title, desc,kkm, start_quiz: startDate, end_quiz: endDate, id_mapel: mapel, id_kelas: kelas, waktu: duration, id_user: id_user ,token})
      .eq('id', quizId);

    if (quizUpdateError) throw new Error(`Quiz update error: ${quizUpdateError.message}`);

    for (const e of soalData) {
      let questionId = e.id; // id_question
      let questionResult;

      if (questionId) {
        // Update the existing question
        const { data: questionData, error: questionUpdateError } = await supabase
          .from("questions")
          .update({ question: e.question })
          .eq('id', questionId)
          .select();

        if (questionUpdateError) throw new Error(`Question update error: ${questionUpdateError.message}`);
        questionResult = questionData[0];
        existingQuestionIds.push(questionId);
      } else {
        // Insert new question
        const { data: questionData, error: questionInsertError } = await supabase
          .from("questions")
          .insert({ id_quiz: quizId, question: e.question })
          .select();

        if (questionInsertError) throw new Error(`Question insert error: ${questionInsertError.message}`);
        questionResult = questionData[0];
        insertedQuestionIds.push(questionResult.id);
      }

      // Now handle the answer options
      const answerInsertData = [];
      for (const answer of e.answerOption) {
        if (answer.id) {
          // Update existing answer option
          const { error: answerUpdateError } = await supabase
            .from("options")
            .update({ option: answer.answerOption, option_is_true: answer.answerIsTrue })
            .eq('id', answer.id);

          if (answerUpdateError) throw new Error(`Answer update error: ${answerUpdateError.message}`);
        } else {
          // Insert new answer option
          answerInsertData.push({
            id_question: questionResult.id,
            option: answer.answerOption,
            option_is_true: answer.answerIsTrue
          });
        }
      }

      if (answerInsertData.length > 0) {
        const { error: answerInsertError } = await supabase
          .from("options")
          .insert(answerInsertData);

        if (answerInsertError) throw new Error(`Answer insert error: ${answerInsertError.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        message: "Kuis Berhasil Diperbarui",
      }),
      { status: 200 }
    );
  } catch (error) {
    // console.log(error)
    console.error('Transaction error:', error.message);

    // Rollback operations if necessary
    if (insertedQuestionIds.length > 0) {
      await supabase.from('questions').delete().in('id', insertedQuestionIds);
    }

    return new Response(
      JSON.stringify({
        message: "Gagal Memperbarui Kuis, rollback dilakukan",
        error: error.message
      }),
      { status: 500 }
    );
  }
};


export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const perPage = 10
  let query = supabase
    .from("quiz")
    .select("*")
    .limit(perPage)
    .order("created_at", { ascending: false });

  // Kondisi untuk id
  if (id > 0) {
    query = query.lt("id", id);
  }

  // Kondisi untuk search
  if (search) {
    query = query.ilike("token", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching quiz details",
        error: error.message,
      }),
      { status: 500 }
    );
  }

  let lastId = null;

  if (data.length > 0) {
    lastId = data[data.length - 1].id;
  }

  const payload = {
    lastId,
    data,
    perPage
  };

  if (data) {
    return new Response(
      JSON.stringify({
        message: 200,
        data: { ...payload },
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: 404,
        data: [],
      }),
      { status: 404 }
    );
  }
};
export const DELETE = async ({ params, url }) => {
  
  const id = url.searchParams.get("id");
  // console.log(id)
  const perPage = 10
  const {error} =await  supabase.from("quiz").delete().eq('id',id)

  // Kondisi untuk id
  // console.log({error})
 
  if (error) {
    return new Response(
      JSON.stringify({
        message: "gagal menghapus kuis",
       
      }),
      { status: 404 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "kuis berhasil dihapus",
       
      }),
      { status: 200 }
    );
  }
};