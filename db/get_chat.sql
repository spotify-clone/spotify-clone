SELECT history FROM chat_history AS ch
JOIN local_account AS la ON ch.user_id = la.account_id
WHERE email = ${email}