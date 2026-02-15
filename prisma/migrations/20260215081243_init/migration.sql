-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL DEFAULT '',
    "entreprise" TEXT NOT NULL DEFAULT '',
    "statut" TEXT NOT NULL DEFAULT 'prospect',
    "dateAjout" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dernierContact" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contenu" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "Note_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_statut_idx" ON "Contact"("statut");

-- CreateIndex
CREATE INDEX "Contact_dateAjout_idx" ON "Contact"("dateAjout");

-- CreateIndex
CREATE INDEX "Contact_dernierContact_idx" ON "Contact"("dernierContact");

-- CreateIndex
CREATE INDEX "Note_contactId_idx" ON "Note"("contactId");

-- CreateIndex
CREATE INDEX "Note_date_idx" ON "Note"("date");
