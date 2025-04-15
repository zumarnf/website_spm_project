const PaginationPen = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 2, 1); // Mulai dari halaman saat ini - 2
    let endPage = Math.min(startPage + 5, totalPages); // Batasi ke 6 halaman (start + 5)

    // Jika halaman akhir kurang dari 6, geser startPage agar tetap 6 halaman ditampilkan
    if (endPage - startPage < 5) {
      startPage = Math.max(endPage - 5, 1);
    }

    // Bangun array untuk halaman yang ditampilkan
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="join border-none bg-whtprmy text-blckprmy">
      {/* Tombol Prev */}
      <button
        className="join-item btn btn-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Render halaman sesuai kondisi */}
      {renderPageNumbers().map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm ${
            currentPage === page ? "bg-rdprmy text-whtprmy" : "bg-whtprmy"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Tombol Next */}
      <button
        className="join-item btn btn-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationPen;
