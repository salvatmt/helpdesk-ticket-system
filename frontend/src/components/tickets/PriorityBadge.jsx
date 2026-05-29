function PriorityBadge({ prioridad }) {

  const colores = {

    baja:
      "bg-green-100 text-green-700",

    media:
      "bg-orange-100 text-orange-700",

    alta:
      "bg-red-100 text-red-700"
  };

  return (

    <span
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${colores[prioridad]}
      `}
    >
      {prioridad}
    </span>
  );
}

export default PriorityBadge;