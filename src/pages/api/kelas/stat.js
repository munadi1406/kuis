import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
    try {
      const search = url.searchParams.get("search");
      const id = url.searchParams.get("id");
  
      const perPage = 10;
  
      // Get the active academic year
      const { data: activeTahunAjaran, error: tahunAjaranError } = await supabase
        .from("tahun_ajaran")
        .select("*")
        .eq("status", true)  // Select active academic year
        .single();  // Ensure only one record is fetched
  
      if (tahunAjaranError) {
        return new Response(
          JSON.stringify({
            message: "Error fetching active academic year",
            error: tahunAjaranError.message,
          }),
          { status: 500 }
        );
      }
  
      // Query to fetch class details and student info
      let query = supabase
        .from("kelas")
        .select(`
        *,
        kelas_history!left(tahun_ajaran(id), siswa!left(jenis_kelamin))
      `)
        .limit(perPage)
        .order("kelas", { ascending: true })
        .eq('kelas_history.tahun_ajaran.id', activeTahunAjaran.id) // Match active academic year
        .is('kelas_history.end_date', null); // Active class based on history
  
      // Condition to filter by ID
      if (id > 0) {
        query = query.lt("id", id);
      }
  
      // Condition for search (search by class name)
      if (search) {
        query = query.ilike("kelas", `%${search}%`);
      }
  
      // Execute the query
      const { data, error } = await query;
  
      if (error) {
        return new Response(
          JSON.stringify({
            message: "Error fetching class details",
            error: error.message,
          }),
          { status: 500 }
        );
      }
  
      // Calculate the total number of students and categorize by gender
      const processedData = data.map((kelas) => {
        const siswa = kelas.kelas_history.flatMap(history => history.siswa); // Flatten history to get students
        const totalLakiLaki = siswa.filter(s => s.jenis_kelamin === 'Laki-laki').length;
        const totalPerempuan = siswa.filter(s => s.jenis_kelamin === 'Perempuan').length;
  
        return {
          ...kelas,
          totalLakiLaki,
          totalPerempuan,
          totalSiswa: siswa.length // Total students in the class
        };
      });
  
      // Find the last ID in the result for pagination
      let lastId = null;
      if (data.length > 0) {
        lastId = data[data.length - 1].id;
      }
  
      // Payload to be returned in the response
      const payload = {
        lastId,
        data: processedData,
        perPage
      };
  
      return new Response(
        JSON.stringify({
          message: 200,
          data: { ...payload },
        }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
        }),
        { status: 500 }
      );
    }
  };
  