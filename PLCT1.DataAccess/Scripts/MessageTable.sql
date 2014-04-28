USE [PLCT1]
GO

/****** Object:  Table [dbo].[Messages]    Script Date: 4/24/2014 7:43:10 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Messages](
	[MessageId] [int] IDENTITY (1,1) NOT NULL,
	[Content] [nvarchar](100) NOT NULL,
	[DatePosted] [datetime] NOT NULL,
	[Starred] [bit] NOT NULL,
 CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED 
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


