CREATE TABLE `chapters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chapterNumber` int NOT NULL,
	`arabicTitle` varchar(255) NOT NULL,
	`englishTitle` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`description` text,
	`arabicContent` text,
	`englishContent` text,
	`order` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chapters_id` PRIMARY KEY(`id`),
	CONSTRAINT `chapters_chapterNumber_unique` UNIQUE(`chapterNumber`)
);
--> statement-breakpoint
CREATE TABLE `fileUploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chapterId` int,
	`fileName` varchar(255) NOT NULL,
	`fileUrl` varchar(500) NOT NULL,
	`fileType` varchar(50) NOT NULL,
	`fileSize` int,
	`uploadedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fileUploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`location` varchar(255),
	`linkedIn` varchar(500),
	`gitHub` varchar(500),
	`bio` text,
	`photoUrl` varchar(500),
	`summary` text,
	`skills` text,
	`certifications` text,
	`experience` text,
	`education` text,
	`languages` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultationPrice` decimal(10,2),
	`consultationCurrency` varchar(10) DEFAULT 'USD',
	`whatsappNumber` varchar(20),
	`contactEmail` varchar(320),
	`consultationDescription` text,
	`showConsultationSection` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `fileUploads` ADD CONSTRAINT `fileUploads_chapterId_chapters_id_fk` FOREIGN KEY (`chapterId`) REFERENCES `chapters`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fileUploads` ADD CONSTRAINT `fileUploads_uploadedBy_users_id_fk` FOREIGN KEY (`uploadedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;