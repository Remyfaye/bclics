import Link from "next/link";

export default function SidebarMenuItem({ upload, link, text, Icon, active }) {
  return (
    <div className="hoverEffect mb-2 flex items-center text-gray-700 justify-start text-sm space-x-3 hover:bg-gray-200 rounded-full">
      <a href={upload ? "upload" : `/allProducts/${link}`}>
        <Icon className="h-7 mr-3" />
        <span className={`${active && "text-lg font-semibold"} inline`}>
          {text}
        </span>
      </a>
    </div>
  );
}
