"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/src/components/ui/!to-migrate/button";
import { Card, CardContent } from "@/src/components/ui/!to-migrate/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/src/components/ui/!to-migrate/radio-group";
import { Label } from "@/src/components/ui/!to-migrate/label";
import { ChevronRight, ChevronLeft, InfoIcon } from "lucide-react";
import UserIcon from "@/src/components/navigation/UserIcon";
import { useQuickNavigate } from "@/src/hooks/useQuickNavigate";

export default function PeriodDurationPage() {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [refTarget, setRefTarget] = useState("");
  const location = useLocation();
  const radioRef = useRef<HTMLButtonElement | null>(null);
  const continueButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isQuickResponse } = useQuickNavigate();

  useEffect(() => {
    if (!isQuickResponse) return;
    const options = [
      "1-3",
      "4-5",
      "6-7",
      "8+",
      "It varies",
      "I'm not sure",
      "Other",
    ];
    const random = options[Math.floor(Math.random() * options.length)];
    setRefTarget(random);

    setTimeout(() => {
      if (radioRef.current) {
        radioRef.current.click();
      }
    }, 100);

    setTimeout(() => {
      if (continueButtonRef.current) {
        continueButtonRef.current.click();
      }
    }, 100);
  }, [isQuickResponse]);

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    sessionStorage.setItem("periodDuration", value);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-pink-50">

      <main className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">50% Complete</div>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div className="bg-pink-500 h-2 rounded-full w-[50%]"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="lg:w-1/2 flex items-top justify-center lg:justify-start text-center lg:text-left">
           <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold mb-2">Question 3 of 6</h1>
            <h2 className="text-3xl font-semibold mb-1">How many days does your period typically last?</h2>
            <p className="text-sm text-gray-500 mb-6">Count the days from when bleeding starts until it completely stops</p>
            <img src="/assessmentAssets/duration.svg" alt="" className="filter contrast-125 hover:scale-105 transition duration-300" />
           </div>
          </div>
        
          <Card className="w-full lg:w-1/2 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 pb-8">
                <RadioGroup value={selectedDuration || ""} onValueChange={handleDurationChange} className="mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="1-3" id="1-3" />
                      <Label htmlFor="1-3" className="flex-1 cursor-pointer">
                        <div className="font-medium">1-3 days</div>
                        <p className="text-sm text-gray-500">Shorter duration</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="4-5" id="4-5" />
                      <Label htmlFor="4-5" className="flex-1 cursor-pointer">
                        <div className="font-medium">4-5 days</div>
                        <p className="text-sm text-gray-500">Average duration</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="6-7" id="6-7" />
                      <Label htmlFor="6-7" className="flex-1 cursor-pointer">
                        <div className="font-medium">6-7 days</div>
                        <p className="text-sm text-gray-500">Longer duration</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="8-plus" id="8-plus" />
                      <Label htmlFor="8-plus" className="flex-1 cursor-pointer">
                        <div className="font-medium">8+ days</div>
                        <p className="text-sm text-gray-500">Extended duration</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="varies" id="varies" />
                      <Label htmlFor="varies" className="flex-1 cursor-pointer">
                        <div className="font-medium">It varies</div>
                        <p className="text-sm text-gray-500">Changes from cycle to cycle</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="not-sure" id="not-sure" />
                      <Label htmlFor="not-sure" className="flex-1 cursor-pointer">
                        <div className="font-medium">I'm not sure</div>
                        <p className="text-sm text-gray-500">Need help tracking</p>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="flex-1 cursor-pointer">
                        <div className="font-medium">Other</div>
                        <p className="text-sm text-gray-500">Specify your own period duration</p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
          </Card>
        </div>


        <Card className="w-full mb-8 bg-pink-50 border-pink-100 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <InfoIcon className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  About Period Duration
                </h3>
                <p className="text-sm text-gray-600">
                  A typical period lasts between 3-7 days. Periods lasting
                  longer than 7 days may indicate hormonal imbalances or other
                  health conditions.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Spotting before or after your period is common but should be
                  noted separately from your main flow.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-gray-500 mb-4">
          Your data is private and secure. Dottie does not store your personal
          health information.
        </p>

        <div className="flex justify-between w-full mt-auto">
          <Link to="/assessment/cycle-length">
            <Button
              variant="outline"
              className="flex items-center px-6 py-6 text-lg"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </Link>

          <Link
            to={
              selectedDuration
                ? `/assessment/flow${
                    location.search.includes("mode=quickresponse")
                      ? "?mode=quickresponse"
                      : ""
                  }`
                : "#"
            }
          >
            <Button
              className={`flex items-center px-6 py-6 text-lg ${
                selectedDuration
                  ? "bg-pink-600 hover:bg-pink-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              ref={continueButtonRef}
              disabled={!selectedDuration}
            >
              Continue
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
