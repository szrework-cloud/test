DELETE FROM "Note";
DELETE FROM "Contact";

INSERT INTO "Contact" ("id", "prenom", "nom", "email", "telephone", "entreprise", "statut", "dateAjout", "dernierContact") VALUES
('1', 'Sophie', 'Dubois', 'sophie.dubois@techvision.fr', '06 12 34 56 78', 'TechVision', 'client', '2025-01-15T00:00:00.000Z', '2025-02-10T00:00:00.000Z'),
('2', 'Thomas', 'Martin', 't.martin@greenleaf.fr', '06 23 45 67 89', 'GreenLeaf', 'prospect', '2025-01-22T00:00:00.000Z', '2025-02-08T00:00:00.000Z'),
('3', 'Camille', 'Bernard', 'camille.b@designpulse.fr', '06 34 56 78 90', 'DesignPulse', 'client', '2025-02-01T00:00:00.000Z', '2025-02-12T00:00:00.000Z'),
('4', 'Lucas', 'Petit', 'lucas.petit@datanova.fr', '06 45 67 89 01', 'DataNova', 'perdu', '2024-11-10T00:00:00.000Z', '2025-01-05T00:00:00.000Z'),
('5', 'Emma', 'Leroy', 'emma.leroy@cloudpeak.fr', '06 56 78 90 12', 'CloudPeak', 'prospect', '2025-02-05T00:00:00.000Z', '2025-02-11T00:00:00.000Z'),
('6', 'Antoine', 'Moreau', 'a.moreau@financeplus.fr', '06 67 89 01 23', 'FinancePlus', 'client', '2024-12-03T00:00:00.000Z', '2025-02-09T00:00:00.000Z'),
('7', 'Manon', 'Garcia', 'manon.garcia@biozen.fr', '06 78 90 12 34', 'BioZen', 'prospect', '2025-02-08T00:00:00.000Z', '2025-02-13T00:00:00.000Z'),
('8', 'Hugo', 'Roux', 'hugo.roux@mediasphere.fr', '06 89 01 23 45', 'MediaSphere', 'client', '2024-10-20T00:00:00.000Z', '2025-02-07T00:00:00.000Z'),
('9', 'Lea', 'Fournier', 'lea.fournier@urbancraft.fr', '06 90 12 34 56', 'UrbanCraft', 'perdu', '2024-12-15T00:00:00.000Z', '2025-01-20T00:00:00.000Z'),
('10', 'Nathan', 'Girard', 'n.girard@smartflow.fr', '06 01 23 45 67', 'SmartFlow', 'prospect', '2025-02-12T00:00:00.000Z', '2025-02-14T00:00:00.000Z');

INSERT INTO "Note" ("id", "contactId", "contenu", "date") VALUES
('n1', '1', 'Premier appel de decouverte. Sophie est interessee par notre offre premium.', '2025-01-16T00:00:00.000Z'),
('n2', '1', 'Envoi de la proposition commerciale. Retour attendu sous 1 semaine.', '2025-01-25T00:00:00.000Z'),
('n3', '1', 'Contrat signe ! Demarrage du projet prevu en mars.', '2025-02-10T00:00:00.000Z'),
('n4', '2', 'Rencontre au salon GreenTech. Thomas cherche un outil de gestion.', '2025-01-22T00:00:00.000Z'),
('n5', '2', 'Demo planifiee pour la semaine prochaine.', '2025-02-08T00:00:00.000Z'),
('n6', '3', 'Camille recommandee par Sophie. Besoin en design UX.', '2025-02-01T00:00:00.000Z'),
('n7', '5', 'Prise de contact via LinkedIn. Interet pour notre solution cloud.', '2025-02-05T00:00:00.000Z'),
('n8', '7', 'Rencontre lors d''un meetup. Manon developpe des complements alimentaires bio.', '2025-02-08T00:00:00.000Z');
