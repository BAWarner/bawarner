SELECT p.*, u.username, u.profile_picture
FROM helo_posts p
JOIN helo_users u
ON p.user_id = u.user_id
WHERE p.user_id = $1