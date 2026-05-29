function StatusBadge({ estado }) {

  const colores = {

    abierto:
      "bg-yellow-100 text-yellow-700",

    en_proceso:
      "bg-blue-100 text-blue-700",

    resuelto:
      "bg-green-100 text-green-700",

    cerrado:
      "bg-gray-200 text-gray-700"
  };

  return (

    <span
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${colores[estado]}
      `}
    >
      {estado}
    </span>
  );
}

export default StatusBadge;