import { Link } from "react-router-dom";
export default function UserNavigation() {
  const tabs = [
    { name: "Home", href: "/feed" },

    { name: "Membresía", href: "/mi-membresia" },
    { name: "Rutina", href: "/mi-rutina" },
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
              : " hover:bg-accent hover:text-accent-foreground py-2 px-5 rounded-lg transition",
          )}
        >
          {tab.name}
        </Link>
      ))}
    </>
  );
}
