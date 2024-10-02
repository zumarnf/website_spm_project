import React, { useState } from "react";

const InputPenMaha = ({ onClose }) => {
  const [participants, setParticipants] = useState([{ name: "", id: "" }]);

  const handleAddParticipant = () => {
    if (participants.length < 5) {
      setParticipants([...participants, { name: "", id: "" }]);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  return (
    <>
      <dialog
        id="my_modal_6"
        className="modal modal-bottom sm:modal-middle"
        open
      >
        <div className="modal-box bg-whtprmy text-blckprmy">
          <h3 className="font-bold text-lg pb-7">Input Partisipasi</h3>
          <form className="grid grid-cols-3 gap-y-4 gap-x-3 text-sm">
            {participants.map((participant, index) => (
              <React.Fragment key={index}>
                {/* Label sesuai urutan input */}
                <label className="font-bold">
                  {index === 0 ? "Ketua" : "Anggota"}
                </label>
                <input
                  type="text"
                  placeholder="Nama"
                  className="input input-bordered w-full bg-whtprmy input-sm"
                  value={participant.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
                <div className="flex flex-row gap-2 justify-center items-center">
                  <input
                    type="text"
                    placeholder="NIM/NIP"
                    className="input input-bordered w-full bg-whtprmy input-sm"
                    value={participant.id}
                    onChange={(e) => handleChange(index, "id", e.target.value)}
                  />
                  {index === participants.length - 1 &&
                    participants.length < 5 && (
                      <button
                        type="button"
                        className="btn btn-xs font-extrabold text-base rounded-full text-whtprmy bg-rdprmy flex border-none text-center"
                        onClick={handleAddParticipant}
                      >
                        +
                      </button>
                    )}
                  {participants.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-xs font-extrabold text-base rounded-full text-whtprmy bg-rdprmy flex border-none text-center"
                      onClick={() => handleDeleteParticipant(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </form>
          <div className="modal-action pt-7">
            <button className="btn btn-sm text-whtprmy bg-rdprmy border-none">
              Simpan Permanen
            </button>
            <button
              className="btn btn-sm text-whtprmy bg-rdprmy border-none"
              onClick={onClose}
            >
              Back
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InputPenMaha;
