ALTER TABLE "shopping_cart"
ALTER COLUMN "price" SET DATA TYPE bigint USING price::bigint;

ALTER TABLE "shopping_cart"
ALTER COLUMN "sale_price" SET DATA TYPE bigint USING sale_price::bigint;
