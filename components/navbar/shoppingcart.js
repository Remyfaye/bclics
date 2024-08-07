import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

export default function Shoppingcart({ items }) {
  return (
    <a href="/cart">
      <span>
        <ShoppingCartIcon className="h-12" />
        <span className=" badge badge-warning text-white mr-5 bg-primary">
          {items}
        </span>
      </span>
    </a>
  );
}
