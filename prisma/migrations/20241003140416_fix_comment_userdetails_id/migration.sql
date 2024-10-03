-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "FontFamily" AS ENUM ('Poppins', 'Roboto');

-- CreateEnum
CREATE TYPE "FontWeight" AS ENUM ('light', 'normal', 'medium', 'semibold', 'bold', 'black');

-- CreateEnum
CREATE TYPE "TextDecoration" AS ENUM ('default', 'underline', 'line_through');

-- CreateEnum
CREATE TYPE "TextAlign" AS ENUM ('left', 'center', 'right', 'justify');

-- CreateEnum
CREATE TYPE "CompanyPageSectionTypes" AS ENUM ('faqSection', 'opinionsSection', 'commentsSection');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarId" TEXT,
    "description" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetailsOnCompany" (
    "id" TEXT NOT NULL,
    "userDetailsId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetailsOnCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetailsOnBusinessCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userDetailsId" TEXT NOT NULL,
    "businessCardId" TEXT NOT NULL,

    CONSTRAINT "UserDetailsOnBusinessCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCardTheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "BusinessCardTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCardConfig" (
    "id" TEXT NOT NULL,
    "styles" JSONB,

    CONSTRAINT "BusinessCardConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "frontId" TEXT,
    "backId" TEXT,
    "generalStyles" JSONB,
    "qrLink" TEXT,
    "companyId" TEXT,

    CONSTRAINT "BusinessCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextElement" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "text" TEXT NOT NULL,
    "positionX" INTEGER,
    "positionY" INTEGER,
    "color" TEXT DEFAULT '#333',
    "fontSize" INTEGER DEFAULT 12,
    "fontFamily" "FontFamily" DEFAULT 'Poppins',
    "fontWeight" "FontWeight" DEFAULT 'normal',
    "fontStyle" TEXT,
    "textDecoration" "TextDecoration" DEFAULT 'default',
    "textAlign" "TextAlign" DEFAULT 'center',
    "lineHeight" DOUBLE PRECISION DEFAULT 1.2,
    "letterSpacing" DOUBLE PRECISION DEFAULT 1.2,
    "isHidden" BOOLEAN DEFAULT false,
    "zIndex" INTEGER DEFAULT 0,
    "businessCardConfigId" TEXT,
    "businessCardId" TEXT,

    CONSTRAINT "TextElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "logoId" TEXT,
    "companyName" TEXT,
    "slug" TEXT NOT NULL,
    "ownerName" TEXT,
    "nip" TEXT,
    "regon" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT DEFAULT 'pl',
    "isPublished" BOOLEAN DEFAULT true,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "faqSectionId" TEXT,

    CONSTRAINT "FaqQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "companyPageSectionId" TEXT,

    CONSTRAINT "FaqSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opinion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "userDetailsId" TEXT NOT NULL,
    "opinionsSectionId" TEXT,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpinionsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "companyPageSectionId" TEXT,

    CONSTRAINT "OpinionsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "userDetailsId" TEXT NOT NULL,
    "commentsSectionId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentsSection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "companyPageSectionId" TEXT,

    CONSTRAINT "CommentsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPageSection" (
    "id" TEXT NOT NULL,
    "sectionType" "CompanyPageSectionTypes" NOT NULL,
    "companyPageId" TEXT NOT NULL,

    CONSTRAINT "CompanyPageSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetailsOnCompany_userDetailsId_companyId_key" ON "UserDetailsOnCompany"("userDetailsId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetailsOnBusinessCard_businessCardId_key" ON "UserDetailsOnBusinessCard"("businessCardId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetailsOnBusinessCard_userDetailsId_businessCardId_key" ON "UserDetailsOnBusinessCard"("userDetailsId", "businessCardId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCard_frontId_key" ON "BusinessCard"("frontId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCard_backId_key" ON "BusinessCard"("backId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCard_companyId_key" ON "BusinessCard"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "File"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FaqSection_companyPageSectionId_key" ON "FaqSection"("companyPageSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Opinion_userDetailsId_opinionsSectionId_key" ON "Opinion"("userDetailsId", "opinionsSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "OpinionsSection_companyPageSectionId_key" ON "OpinionsSection"("companyPageSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentsSection_companyPageSectionId_key" ON "CommentsSection"("companyPageSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPage_slug_key" ON "CompanyPage"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetailsOnCompany" ADD CONSTRAINT "UserDetailsOnCompany_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetailsOnCompany" ADD CONSTRAINT "UserDetailsOnCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetailsOnBusinessCard" ADD CONSTRAINT "UserDetailsOnBusinessCard_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetailsOnBusinessCard" ADD CONSTRAINT "UserDetailsOnBusinessCard_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_frontId_fkey" FOREIGN KEY ("frontId") REFERENCES "BusinessCardConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_backId_fkey" FOREIGN KEY ("backId") REFERENCES "BusinessCardConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextElement" ADD CONSTRAINT "TextElement_businessCardConfigId_fkey" FOREIGN KEY ("businessCardConfigId") REFERENCES "BusinessCardConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextElement" ADD CONSTRAINT "TextElement_businessCardId_fkey" FOREIGN KEY ("businessCardId") REFERENCES "BusinessCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqQuestion" ADD CONSTRAINT "FaqQuestion_faqSectionId_fkey" FOREIGN KEY ("faqSectionId") REFERENCES "FaqSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqSection" ADD CONSTRAINT "FaqSection_companyPageSectionId_fkey" FOREIGN KEY ("companyPageSectionId") REFERENCES "CompanyPageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_opinionsSectionId_fkey" FOREIGN KEY ("opinionsSectionId") REFERENCES "OpinionsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpinionsSection" ADD CONSTRAINT "OpinionsSection_companyPageSectionId_fkey" FOREIGN KEY ("companyPageSectionId") REFERENCES "CompanyPageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userDetailsId_fkey" FOREIGN KEY ("userDetailsId") REFERENCES "UserDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentsSectionId_fkey" FOREIGN KEY ("commentsSectionId") REFERENCES "CommentsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsSection" ADD CONSTRAINT "CommentsSection_companyPageSectionId_fkey" FOREIGN KEY ("companyPageSectionId") REFERENCES "CompanyPageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPageSection" ADD CONSTRAINT "CompanyPageSection_companyPageId_fkey" FOREIGN KEY ("companyPageId") REFERENCES "CompanyPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPage" ADD CONSTRAINT "CompanyPage_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Company"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
