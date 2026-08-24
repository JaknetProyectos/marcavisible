"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { Plan } from "@/types/plan";
import { CartItem } from "@/types/product";

interface CartContextType {
    items: CartItem[];

    // Estado del Drawer
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    setIsOpen: (isOpen: boolean) => void;

    // productos distintos en el carrito
    itemCount: number;

    // unidades totales sumando quantity
    totalQuantity: number;

    total: number;
    addItem: (product: Plan, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: string) => boolean;
    getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "marketing_cart";

function normalizeCartItems(items: CartItem[]): CartItem[] {
    const map = new Map<string, CartItem>();

    for (const item of items) {
        const existing = map.get(item.product.id);

        if (existing) {
            map.set(item.product.id, {
                ...existing,
                quantity: existing.quantity + item.quantity,
            });
        } else {
            map.set(item.product.id, item);
        }
    }

    return Array.from(map.values());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);

            if (savedCart) {
                const parsed = JSON.parse(savedCart) as CartItem[];
                setItems(normalizeCartItems(parsed));
            }
        } catch (error) {
            console.error("Error loading cart from storage:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Error saving cart to storage:", error);
        }
    }, [items, isLoaded]);

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

    const addItem = useCallback((product: Plan, quantity: number = 1) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, { product, quantity }];
        });
        setIsOpen(true); // Abre automáticamente el drawer al agregar un producto
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.product.id !== productId)
        );
    }, []);

    const updateQuantity = useCallback(
        (productId: string, quantity: number) => {
            if (quantity <= 0) {
                removeItem(productId);
                return;
            }

            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            );
        },
        [removeItem]
    );

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const isInCart = useCallback(
        (productId: string) => {
            return items.some((item) => item.product.id === productId);
        },
        [items]
    );

    const getItemQuantity = useCallback(
        (productId: string) => {
            const item = items.find((item) => item.product.id === productId);
            return item?.quantity ?? 0;
        },
        [items]
    );

    const itemCount = useMemo(() => items.length, [items]);

    const totalQuantity = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const total = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            isOpen,
            openCart,
            closeCart,
            toggleCart,
            setIsOpen,
            itemCount,
            totalQuantity,
            total,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            isInCart,
            getItemQuantity,
        }),
        [
            items,
            isOpen,
            openCart,
            closeCart,
            toggleCart,
            itemCount,
            totalQuantity,
            total,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            isInCart,
            getItemQuantity,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart debe ser utilizado estrictamente dentro de un CartProvider");
    }
    return context;
}