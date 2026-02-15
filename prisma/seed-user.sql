INSERT INTO "User" (id, email, password, prenom, nom, "createdAt")
VALUES (
  'admin-user-001',
  'admin@solocrm.fr',
  '$2b$12$rNU43qazRDwVzjucGVMiJO11SaizUUnxyrWjblC54VsyNMmD3.u8u',
  'Admin',
  'SoloCRM',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
