
import React from 'react';
import AppHeader from '@/components/AppHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="mb-6 w-full justify-start overflow-x-auto">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="usecases">Use Cases</TabsTrigger>
            <TabsTrigger value="statechart">State Chart</TabsTrigger>
            <TabsTrigger value="activitychart">Activity Chart</TabsTrigger>
            <TabsTrigger value="technology">Technology Stack</TabsTrigger>
          </TabsList>
          
          <TabsContent value="architecture" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col">
                  <div className="border border-gray-300 p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
                    <h3 className="text-lg font-medium mb-2">Frontend (Client)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>React components</li>
                      <li>React Router for navigation</li>
                      <li>Context API for state management</li>
                      <li>Tailwind CSS for styling</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="border-l-2 h-8 border-dashed border-gray-400"></div>
                  </div>
                  
                  <div className="border border-gray-300 p-4 rounded-lg mb-4 bg-white dark:bg-gray-800">
                    <h3 className="text-lg font-medium mb-2">API Layer</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>React Query for data fetching</li>
                      <li>Supabase API client</li>
                      <li>Authentication services</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="border-l-2 h-8 border-dashed border-gray-400"></div>
                  </div>
                  
                  <div className="border border-gray-300 p-4 rounded-lg bg-white dark:bg-gray-800">
                    <h3 className="text-lg font-medium mb-2">Backend (Supabase)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>PostgreSQL Database</li>
                      <li>Auth Services</li>
                      <li>Storage Buckets (for pet images)</li>
                      <li>Real-time subscription</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="usecases" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-2">Pet Adopter</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs">1</span>
                      <span>Browse available pets for adoption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs">2</span>
                      <span>Add pets to favorites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs">3</span>
                      <span>View pet details and owner information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs">4</span>
                      <span>Submit adoption request form</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs">5</span>
                      <span>Contact pet owner</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-2">Pet Owner</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs">1</span>
                      <span>List pets for adoption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs">2</span>
                      <span>Update pet information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs">3</span>
                      <span>View adoption requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs">4</span>
                      <span>Approve/reject adoption requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs">5</span>
                      <span>Mark pet as adopted</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="statechart" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">State Chart</h2>
              <div className="border p-6 rounded-lg bg-white dark:bg-gray-800 overflow-x-auto">
                <div className="min-w-[700px]">
                  <h3 className="text-lg font-medium mb-6 text-center">Pet Adoption Process State Chart</h3>
                  
                  <div className="flex justify-center items-center gap-8">
                    <div className="flex flex-col items-center">
                      <div className="p-4 border border-gray-300 rounded-lg bg-pet-soft-peach w-36 text-center">
                        <span className="font-medium">Available</span>
                      </div>
                      <div className="h-16 border-l border-dashed border-gray-400"></div>
                      <div className="p-4 border border-gray-300 rounded-lg bg-pet-soft-blue w-36 text-center">
                        <span className="font-medium">Request Pending</span>
                      </div>
                      <div className="h-16 border-l border-dashed border-gray-400"></div>
                      <div className="flex gap-8 items-center">
                        <div>
                          <div className="p-4 border border-gray-300 rounded-lg bg-red-100 w-36 text-center">
                            <span className="font-medium">Rejected</span>
                          </div>
                          <div className="h-16 border-l border-dashed border-gray-400 ml-16"></div>
                          <div className="w-32 text-center mt-[-16px]">
                            <span className="text-xs text-gray-500">(returns to Available)</span>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-300 rounded-lg bg-green-100 w-36 text-center">
                          <span className="font-medium">Approved</span>
                        </div>
                      </div>
                      <div className="h-16 border-l border-dashed border-gray-400 ml-[142px]"></div>
                      <div className="p-4 border border-gray-300 rounded-lg bg-gray-200 w-36 ml-[104px] text-center">
                        <span className="font-medium">Adopted</span>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="p-4 border border-gray-300 rounded-lg bg-gray-100 w-48">
                        <span className="text-sm block mb-1 font-medium">State Transitions:</span>
                        <ul className="text-xs space-y-2">
                          <li>• Pet Listed → Available</li>
                          <li>• User Applies → Request Pending</li>
                          <li>• Owner Rejects → Rejected</li>
                          <li>• Owner Approves → Approved</li>
                          <li>• Process Complete → Adopted</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border border-gray-300 rounded-lg bg-gray-100 w-48">
                        <span className="text-sm block mb-1 font-medium">Guards:</span>
                        <ul className="text-xs space-y-2">
                          <li>• User Authenticated</li>
                          <li>• Form Complete</li>
                          <li>• Owner Verified</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="activitychart" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Activity Chart</h2>
              <div className="border p-6 rounded-lg bg-white dark:bg-gray-800 overflow-x-auto">
                <div className="min-w-[700px]">
                  <h3 className="text-lg font-medium mb-6 text-center">Pet Adoption Activity Flow</h3>
                  
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="p-3 rounded-full bg-pet-light-purple w-32 text-center">
                        <span className="font-medium">Start</span>
                      </div>
                      <div className="h-8 border-l border-gray-400"></div>
                      
                      <div className="flex gap-40">
                        <div className="flex flex-col items-center">
                          <div className="p-3 border border-gray-300 rounded-lg bg-pet-soft-peach w-40 text-center">
                            <span className="font-medium">User Browses Pets</span>
                          </div>
                          <div className="h-8 border-l border-gray-400"></div>
                          <div className="p-3 border border-gray-300 rounded-lg bg-pet-soft-peach w-40 text-center">
                            <span className="font-medium">Views Pet Details</span>
                          </div>
                          <div className="h-8 border-l border-gray-400"></div>
                          <div className="p-3 border border-gray-300 rounded-lg bg-pet-soft-peach w-40 text-center">
                            <span className="font-medium">Submits Adoption Form</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center mt-24">
                          <div className="p-3 border border-gray-300 rounded-lg bg-pet-soft-blue w-40 text-center">
                            <span className="font-medium">Owner Reviews Request</span>
                          </div>
                          <div className="h-8 border-l border-gray-400"></div>
                          <div className="p-3 border border-gray-300 rounded-lg bg-pet-soft-blue w-40 text-center">
                            <span className="font-medium">Decision</span>
                          </div>
                          <div className="h-8 border-l border-gray-400"></div>
                          <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="p-3 border border-green-300 rounded-lg bg-green-100 w-36 text-center">
                                <span className="font-medium">Approved</span>
                              </div>
                              <div className="h-8 border-l border-gray-400"></div>
                              <div className="p-3 border border-gray-300 rounded-lg bg-gray-200 w-36 text-center">
                                <span className="font-medium">Pet Adoption Finalized</span>
                              </div>
                            </div>
                            <div>
                              <div className="p-3 border border-red-300 rounded-lg bg-red-100 w-36 text-center">
                                <span className="font-medium">Rejected</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-8 border-l border-gray-400 ml-[-136px] mt-8"></div>
                      <div className="p-3 rounded-full bg-pet-dark-purple w-32 text-center text-white ml-[-136px]">
                        <span className="font-medium">End</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="technology" className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">R</span>
                    </span>
                    React
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">JavaScript library for building user interfaces, enabling component-based architecture for the application.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">TS</span>
                    </span>
                    TypeScript
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Superset of JavaScript that adds static type definitions, enhancing code quality and developer experience.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">TW</span>
                    </span>
                    Tailwind CSS
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Utility-first CSS framework that allows for rapid UI development with pre-built classes.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">SC</span>
                    </span>
                    shadcn/ui
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Component library built on top of Radix UI, providing accessible and customizable UI components.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">RQ</span>
                    </span>
                    React Query
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Data fetching library for React that simplifies server state management, caching, and updates.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">SB</span>
                    </span>
                    Supabase
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Open-source Firebase alternative with PostgreSQL database, authentication, storage, and realtime features.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">RR</span>
                    </span>
                    React Router
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Standard routing library for React that enables navigation between different components.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">V</span>
                    </span>
                    Vite
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">Modern frontend build tool that provides a faster and leaner development experience.</p>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <span className="text-blue-700 font-bold">Z</span>
                    </span>
                    Zod
                  </h3>
                  <Separator className="mb-3" />
                  <p className="text-sm text-muted-foreground">TypeScript-first schema validation library for form validation and data parsing.</p>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Documentation;
