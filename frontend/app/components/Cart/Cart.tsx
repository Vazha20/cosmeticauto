'use client';

import { useState, useRef, useEffect } from "react";
import { ShoppingCartOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCart } from "../../components/context/CartContext";
import styles from './Cart.module.css';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!cartOpen);

  const { cartItems, cartCount, removeItemFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckout = () => {
    router.push('/checkout');
    setCartOpen(false);
  };

  return (
    <>
      {/* კალათის აიკონი */}
      <div className={styles.iconBox}>
        <ShoppingCartOutlined onClick={toggleCart} className={styles.icon} />
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </div>

      {/* კალათა */}
      <div ref={cartRef} className={`${styles.cart} ${cartOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>კალათა</h3>
          <CloseOutlined className={styles.close} onClick={toggleCart} />
        </div>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>თქვენი კალათა ცარიელია</p>
        ) : (
          <>
            <ul className={styles.itemList}>
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.size}`} className={styles.item}>
                  {/* მხოლოდ mainImage */}
                  <img src={
                      item.image?.startsWith('http')
                        ? item.image
                        : `https://chupstore.onrender.com${item.image}`
                    }/>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemText}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemSize}>{item.size}</p>
                      <p className={styles.itemPrice}>{item.price.toFixed(2)}₾</p>
                    </div>

                    <div className={styles.quantityControl}>
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id, item.size!, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size!, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItemFromCart(item.id, item.size)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>სულ:</span>
                <span>{total.toFixed(2)}₾</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                გაგრძელება
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
