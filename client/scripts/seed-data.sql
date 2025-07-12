-- Seed data for ReWear platform

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Tops', 'T-shirts, blouses, sweaters, and other upper body clothing'),
('Bottoms', 'Pants, jeans, shorts, skirts, and lower body clothing'),
('Dresses', 'All types of dresses and jumpsuits'),
('Outerwear', 'Jackets, coats, blazers, and outer garments'),
('Shoes', 'All types of footwear'),
('Accessories', 'Bags, jewelry, scarves, and other accessories'),
('Activewear', 'Sports and fitness clothing'),
('Formal', 'Formal wear and special occasion clothing');

-- Insert sample users (passwords would be hashed in real implementation)
INSERT INTO users (email, name, password_hash, points, bio, location) VALUES
('sarah@example.com', 'Sarah Chen', '$2b$10$example_hash_1', 150, 'Fashion enthusiast who loves vintage finds!', 'San Francisco, CA'),
('mike@example.com', 'Mike Johnson', '$2b$10$example_hash_2', 80, 'Sustainable fashion advocate and minimalist.', 'Portland, OR'),
('emma@example.com', 'Emma Wilson', '$2b$10$example_hash_3', 200, 'Designer clothing collector looking to share the love.', 'New York, NY'),
('david@example.com', 'David Kim', '$2b$10$example_hash_4', 120, 'Streetwear enthusiast and sneaker collector.', 'Los Angeles, CA'),
('lisa@example.com', 'Lisa Park', '$2b$10$example_hash_5', 90, 'Handmade and artisan clothing lover.', 'Austin, TX'),
('admin@rewear.com', 'Admin User', '$2b$10$example_hash_admin', 1000, 'Platform administrator', 'Remote');

-- Update admin user
UPDATE users SET is_admin = TRUE WHERE email = 'admin@rewear.com';

-- Insert sample items
INSERT INTO items (user_id, title, description, category_id, type, size, condition, tags, images, points_value, status, admin_approved) VALUES
(
    (SELECT id FROM users WHERE email = 'sarah@example.com'),
    'Vintage Leather Jacket',
    'Classic brown leather jacket in excellent condition with minimal wear. Perfect for adding a vintage touch to any outfit.',
    (SELECT id FROM categories WHERE name = 'Outerwear'),
    'Jacket',
    'M',
    'Excellent',
    ARRAY['vintage', 'leather', 'classic', 'brown'],
    ARRAY['/placeholder.svg?height=500&width=500'],
    45,
    'available',
    TRUE
),
(
    (SELECT id FROM users WHERE email = 'emma@example.com'),
    'Designer Summer Dress',
    'Floral print midi dress from a high-end designer. Perfect for summer occasions and garden parties.',
    (SELECT id FROM categories WHERE name = 'Dresses'),
    'Midi Dress',
    'S',
    'Like New',
    ARRAY['designer', 'floral', 'summer', 'midi'],
    ARRAY['/placeholder.svg?height=500&width=500'],
    35,
    'available',
    TRUE
),
(
    (SELECT id FROM users WHERE email = 'mike@example.com'),
    'Premium Denim Jeans',
    'High-quality raw denim jeans with perfect fade. Sustainable and ethically made.',
    (SELECT id FROM categories WHERE name = 'Bottoms'),
    'Jeans',
    'L',
    'Good',
    ARRAY['denim', 'premium', 'raw', 'sustainable'],
    ARRAY['/placeholder.svg?height=500&width=500'],
    30,
    'available',
    TRUE
),
(
    (SELECT id FROM users WHERE email = 'lisa@example.com'),
    'Cozy Wool Sweater',
    'Hand-knitted merino wool sweater, incredibly soft and warm. Perfect for cold weather.',
    (SELECT id FROM categories WHERE name = 'Tops'),
    'Sweater',
    'M',
    'Excellent',
    ARRAY['wool', 'handmade', 'cozy', 'merino'],
    ARRAY['/placeholder.svg?height=500&width=500'],
    40,
    'available',
    TRUE
),
(
    (SELECT id FROM users WHERE email = 'david@example.com'),
    'Athletic Running Shoes',
    'Barely used premium running shoes with excellent support and cushioning.',
    (SELECT id FROM categories WHERE name = 'Shoes'),
    'Running Shoes',
    '9',
    'Like New',
    ARRAY['athletic', 'running', 'comfortable', 'premium'],
    ARRAY['/placeholder.svg?height=500&width=500'],
    50,
    'available',
    TRUE
);

-- Insert some sample swaps
INSERT INTO swaps (requester_id, owner_id, item_id, points_offered, message, status) VALUES
(
    (SELECT id FROM users WHERE email = 'emma@example.com'),
    (SELECT id FROM users WHERE email = 'sarah@example.com'),
    (SELECT id FROM items WHERE title = 'Vintage Leather Jacket'),
    45,
    'Love this vintage jacket! Would you accept points for it?',
    'pending'
),
(
    (SELECT id FROM users WHERE email = 'mike@example.com'),
    (SELECT id FROM users WHERE email = 'lisa@example.com'),
    (SELECT id FROM items WHERE title = 'Cozy Wool Sweater'),
    40,
    'This sweater looks perfect for the winter season!',
    'accepted'
);

-- Insert some sample reviews
INSERT INTO reviews (reviewer_id, reviewed_user_id, rating, comment) VALUES
(
    (SELECT id FROM users WHERE email = 'emma@example.com'),
    (SELECT id FROM users WHERE email = 'sarah@example.com'),
    5,
    'Great communication and item exactly as described!'
),
(
    (SELECT id FROM users WHERE email = 'mike@example.com'),
    (SELECT id FROM users WHERE email = 'david@example.com'),
    4,
    'Fast shipping and good quality item. Recommended!'
);

-- Insert some point transactions
INSERT INTO point_transactions (user_id, amount, transaction_type, description) VALUES
(
    (SELECT id FROM users WHERE email = 'sarah@example.com'),
    50,
    'welcome_bonus',
    'Welcome bonus for joining ReWear'
),
(
    (SELECT id FROM users WHERE email = 'sarah@example.com'),
    25,
    'item_listed',
    'Points earned for listing an item'
),
(
    (SELECT id FROM users WHERE email = 'emma@example.com'),
    30,
    'swap_completed',
    'Points earned from completed swap'
);

-- Insert some notifications
INSERT INTO notifications (user_id, type, title, message) VALUES
(
    (SELECT id FROM users WHERE email = 'sarah@example.com'),
    'swap_request',
    'New Swap Request',
    'Emma Wilson wants to swap for your Vintage Leather Jacket'
),
(
    (SELECT id FROM users WHERE email = 'lisa@example.com'),
    'swap_accepted',
    'Swap Accepted',
    'Mike Johnson accepted your swap request!'
);
