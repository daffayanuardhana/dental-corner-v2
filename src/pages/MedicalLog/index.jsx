import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Header, Button } from "../../components";
import endPoint from "../../api/endPoint";
import { useAuth } from "../../auth/Auth";

const MedicalLog = () => {
  const { user } = useAuth();
  const [konsultasi, setkonsultasi] = useState([]);
  const [profile, setProfile] = useState({
    id: 0,
    nama: "",
    email: "",
    password: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const getKonsultasi = async () => {
      const res = await endPoint.get(`konsultasi/${user}`);
      if (res.status === 200) {
        console.log(res.data);
        setkonsultasi(res.data);
      }
    };
    const handleProfile = async () => {
      const res = await endPoint.get(`user/${user}`);
      if (res.status === 200) {
        console.log(res.data);
        setProfile(res.data);
      }
    };

    handleProfile();
    getKonsultasi();
  }, []);

  return (
    <div className="mt-24 ml-1 mb-5">
      <Helmet>
        <title>Dental Corner | Medical Log</title>
      </Helmet>
      <div className="mt-14 px-14 grid grid-cols-2">
        <div className="">
          <Header className="font-black text-3xl mb-10" h3>
            Medical Log
          </Header>
        </div>
        <div className="flex justify-end h-14">
          <Button bold>Sort By</Button>
        </div>
      </div>
      <div className="mx-14">
        <table className="table-fixed rounded-md w-full text-sm text-left text-gray-500 bg-primary/40">
          <tbody>
            <tr>
              <th className="w-2 px-6 py-3">No.</th>
              <th className="w-24 px-6 py-3">Nama</th>
              <th className="w-24 px-6 py-3">Jenis Layanan</th>
              <th className="w-24 px-6 py-3">Dokter</th>
              <th className="w-24 px-6 py-3">Tanggal Pemeriksaan</th>
            </tr>

            {konsultasi.map((data, i) => (
              <tr key={i}>
                <td className="w-2 px-6 py-3">{++i}</td>
                <td className="w-24 px-6 py-3">{profile.nama}</td>
                <td className="w-24 px-6 py-3">Konsultasi</td>
                <td className="w-24 px-6 py-3">Dr {data.dataDokter.nama}</td>
                <td className="w-24 px-6 py-3">
                  {new Date(data.data.tanggal).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalLog;
