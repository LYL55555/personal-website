"use client";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";
import GamesSection from "@/components/game/GamesSection";

export default function GamePage() {
  return (
    <PageContainer>
      <PageTitle title="Games" compact />
      <div className="container mx-auto px-4">
        <GamesSection />
      </div>
    </PageContainer>
  );
}
