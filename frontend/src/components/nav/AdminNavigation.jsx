import { Link } from "react-router-dom";
export default function UserNavigation() {
  const tabs = [
    { name: "Usuarios", href: "/usuarios" },
    { name: "Membresias", href: "/membresias" },
    { name: "Rutinas", href: "/rutinas" },
    { name: "Ventas", href: "/ventas" },
    { name: "Dashboard", href: "/dashboard" },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.href}
          className={classNames(
            location.pathname === tab.href
              ? "bg-accent text-accent-foreground py-2 px-5 rounded-lg transition"
              : " hover:bg-accent hover:text-primary-foreground py-2 px-5 rounded-lg transition",
          )}
        >
          {tab.name}
        </Link>
      ))}
    </>
  );
}
