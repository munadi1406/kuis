import { supabase } from "../../../lib/supabase";

export const GET = async ({ params, url }) => {
  const search = url.searchParams.get("search");
  const id = url.searchParams.get("id");
  const filter = url.searchParams.get("filter");
  const tahunAjaran = url.searchParams.get("ta");
  const print = url.searchParams.get("p");
  const jk = url.searchParams.get("jk");
  const perPage = 10;

  let query = supabase
    .from("kelas_history")
    .select(`*,siswa!inner(*,detail_user!left(*)),tahun_ajaran!inner(*)`)
    .order("start_date", { ascending: false });

  if (!print) {
    query = query.limit(perPage);
  }
  if (id > 0) {
    const dateId = new Date(parseInt(id)); // Jika id adalah timestamp
    query = query.lt("start_date", dateId.toISOString());
  }

  if (jk) {
    query = query.eq("siswa.jenis_kelamin", jk);
  }

  // Kondisi untuk search
  if (search) {
    query = query.ilike("siswa.nama_lengkap", `%${search}%`);
  }

  if (filter) {
    query = query.eq("id_kelas", filter);
  }

  if (tahunAjaran) {
    query = query.eq("tahun_ajaran.nama", tahunAjaran);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(
      JSON.stringify({
        message: "internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }


  let statLaki = supabase
    .from("kelas_history")
    .select(`id,id_kelas,siswa!inner(jenis_kelamin),tahun_ajaran(nama)`, { count: "exact" })




  if (filter) {
    statLaki = statLaki.eq("id_kelas", filter);

  }

  if (tahunAjaran) {
    statLaki = statLaki.eq("tahun_ajaran.nama", tahunAjaran);

  }
  const { error: maleError, data: statData } = await statLaki
  let maleCount = 0;
  let femaleCount = 0;


  statData.forEach((item) => {
    if (item.siswa.jenis_kelamin === "Laki-laki") {
      maleCount++;
    } else if (item.siswa.jenis_kelamin === "Perempuan") {
      femaleCount++;
    }
  });

  if (maleError) {


    return new Response(
      JSON.stringify({
        message: "internal server error",
        error: maleError?.message,
      }),
      { status: 500 }
    );
  }

  const genderStats = {
    "Laki-Laki": maleCount,
    Perempuan: femaleCount,
  };
  const genderArray = Object.entries(genderStats).map(([gender, count]) => {
    return { gender, count };
  });

  let lastId = null;

  if (data.length > 0) {
    lastId = new Date(data[data.length - 1].start_date).getTime();
  }

  const payload = {
    lastId,
    data,
    perPage,
    genderStats: genderArray, // Tambahkan statistik jenis kelamin ke payload
  };

  if (data) {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: { ...payload },
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "User details fetched successfully",
        data: [],
      }),
      { status: 404 }
    );
  }
};

const formatPhoneNumber = (phone) => {
  // Remove any spaces and check if it starts with +62, if not, add +62
  let formattedPhone = phone.replace(/\s+/g, ''); // Remove spaces
  if (!formattedPhone.startsWith("+62")) {
    if (formattedPhone.startsWith("0")) {
      // Replace leading 0 with +62
      formattedPhone = "+62" + formattedPhone.substring(1);
    } else {
      // Add +62 if no leading 0
      formattedPhone = "+62" + formattedPhone;
    }
  }
  return formattedPhone;
};
export const POST = async ({ params, request, url }) => {
  const { nisn, idUser, namaLengkap, alamat, jenisKelamin, tanggalLahir, idKelas, noTelepon, noTeleponOrtu } = await request.json();

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
  const { data: siswaData, error: siswaError } = await supabase
    .from("siswa")
    .insert([{ nisn, id_user: idUser, nama_lengkap: namaLengkap, alamat, jenis_kelamin: jenisKelamin, tanggal_lahir: tanggalLahir, id_kelas: idKelas, no_hp: formatPhoneNumber(noTelepon), no_hp_ortu: formatPhoneNumber(noTeleponOrtu) }])
    .select();

  if (siswaError) {

    return new Response(
      JSON.stringify({
        message: "Data Siswa Gagal Ditambahkan, Pastikan NISN Tidak Sama Dengan Siswa Lain",
      }),
      { status: 500 }
    );
  }

  // Step 2: Insert data into the 'kelas_siswa_history' table
  const { error: historyError } = await supabase
    .from("kelas_history")
    .insert([{ nisn, id_kelas: idKelas, start_date: new Date().toISOString(), id_tahun_ajaran: activeTahunAjaran.id }]);

  if (historyError) {
    // If inserting into 'kelas_siswa_history' fails, rollback the 'siswa' insertion
    const { error: rollbackError } = await supabase
      .from("siswa")
      .delete()
      .eq('nisn', nisn);

    if (rollbackError) {
      return new Response(
        JSON.stringify({
          message: "Data Siswa Gagal Ditambahkan, dan Gagal Menghapus Data Siswa yang Sudah Tersimpan",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Data Siswa Berhasil Ditambahkan, tetapi gagal menyimpan riwayat kelas dan data siswa telah dihapus.",
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Data Siswa Berhasil Ditambahkan dan Riwayat Kelas Disimpan",
    }),
    { status: 200 }
  );
};



export const PUT = async ({ params, request, url }) => {
  try {
    const {
      nisn,
      idUser,
      lastNisn,
      namaLengkap,
      alamat,
      jenisKelamin,
      tanggalLahir,
      idKelas,
      noTelepon, noTeleponOrtu
    } = await request.json();


    const { data: activeTahunAjaran, error: tahunAjaranError } = await supabase
      .from("tahun_ajaran")
      .select("id")
      .eq("status", true)
      .single();

    if (tahunAjaranError || !activeTahunAjaran) {
      return new Response(
        JSON.stringify({
          message: "Tidak Ada Tahun Ajaran Yang Aktif Saat Ini",
        }),
        { status: 404 }
      );
    }

    // Retrieve existing student data to check current class
    const { data: currentSiswa, error: retrieveError } = await supabase
      .from("siswa")
      .select("id_kelas")
      .eq("nisn", lastNisn)
      .single();

    if (retrieveError || !currentSiswa) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error while retrieving current class",
        }),
        { status: 500 }
      );
    }

    // Begin transaction logic
    let historyUpdateSuccess = true;

    // Check if there is an existing active entry with the same nisn, id_kelas, and id_tahun_ajaran
    const { data: existingHistory, error: historyCheckError } = await supabase
      .from("kelas_history")
      .select("*")
      .eq("nisn", nisn)
      .eq("id_kelas", idKelas)
      .eq("id_tahun_ajaran", activeTahunAjaran.id);

    if (historyCheckError) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error while checking existing kelas history",
        }),
        { status: 500 }
      );
    }

    // Handle moving to a new class
    if (currentSiswa.id_kelas !== idKelas) {
      // Update end_date for the previous class
      const { error: endDateError } = await supabase
        .from("kelas_history")
        .update({ end_date: new Date().toISOString() })
        .eq("nisn", nisn)
        .eq("id_kelas", currentSiswa.id_kelas)
        .eq("id_tahun_ajaran", activeTahunAjaran.id)
        .is("end_date", null);

      if (endDateError) {
        historyUpdateSuccess = false;
        return new Response(
          JSON.stringify({
            message: "Failed to update end_date for the previous class",
          }),
          { status: 500 }
        );
      }

      // If an entry for the new class already exists, just update its end_date to null
      if (existingHistory.length > 0) {
        const { error: updateEndDateError } = await supabase
          .from("kelas_history")
          .update({ end_date: null })
          .eq("nisn", nisn)
          .eq("id_kelas", idKelas)
          .eq("id_tahun_ajaran", activeTahunAjaran.id);

        if (updateEndDateError) {
          historyUpdateSuccess = false;
          return new Response(
            JSON.stringify({
              message: "Failed to update end_date to null for the new class",
            }),
            { status: 500 }
          );
        }
      } else {
        // Insert a new entry if one doesn't exist
        const { error: historyInsertError } = await supabase
          .from("kelas_history")
          .insert([
            {
              nisn,
              id_kelas: idKelas,
              start_date: new Date().toISOString(),
              id_tahun_ajaran: activeTahunAjaran.id,
              end_date: null,
            },
          ]);

        if (historyInsertError) {
          historyUpdateSuccess = false;
          return new Response(
            JSON.stringify({
              message: "Failed to insert new kelas history entry",
            }),
            { status: 500 }
          );
        }
      }
    } else if (existingHistory.length > 0 && existingHistory[0].end_date !== null) {
      // If reverting back to a previous class, update end_date of that entry to null
      const { error: revertEndDateError } = await supabase
        .from("kelas_history")
        .update({ end_date: null })
        .eq("nisn", nisn)
        .eq("id_kelas", idKelas)
        .eq("id_tahun_ajaran", activeTahunAjaran.id);

      if (revertEndDateError) {
        return new Response(
          JSON.stringify({
            message: "Failed to revert end_date to null for the class",
          }),
          { status: 500 }
        );
      }
    }

    if (!historyUpdateSuccess) {
      return new Response(
        JSON.stringify({
          message: "Data siswa diperbarui, tetapi gagal menyimpan riwayat kelas",
        }),
        { status: 500 }
      );
    }

    // Finally, update the student data
    const { data: updateData, error: updateError } = await supabase
      .from("siswa")
      .update({
        nisn,
        id_user: idUser,
        nama_lengkap: namaLengkap,
        alamat,
        jenis_kelamin: jenisKelamin,
        tanggal_lahir: tanggalLahir,
        id_kelas: idKelas,
        no_hp: formatPhoneNumber(noTelepon), no_hp_ortu: formatPhoneNumber(noTeleponOrtu)
      })
      .eq("nisn", lastNisn)
      .select();

    if (updateError) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error during update",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Data siswa berhasil diperbarui dan riwayat kelas disimpan",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};







export const DELETE = async ({ params, request, url }) => {
  const nisn = url.searchParams.get("nisn");

  const { error } = await supabase.from("siswa").delete().eq("nisn", nisn);

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Data Siswa Berhasil Di Hapus",
    }),
    { status: 200 }
  );
};
