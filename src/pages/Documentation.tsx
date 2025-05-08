
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
                {/* UML-style architecture diagram */}
                <div className="flex flex-col items-center">
                  {/* Client/Frontend Layer */}
                  <div className="border-2 border-blue-500 p-4 rounded-lg mb-4 bg-blue-50 dark:bg-blue-900/20 w-full max-w-xl">
                    <h3 className="text-lg font-medium mb-2 text-center border-b border-blue-300 pb-2">Frontend Layer</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        React Components
                      </div>
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        React Router
                      </div>
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Context API
                      </div>
                      <div className="border border-blue-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Tailwind CSS
                      </div>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="w-20 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* API Layer */}
                  <div className="border-2 border-purple-500 p-4 rounded-lg mb-4 bg-purple-50 dark:bg-purple-900/20 w-full max-w-xl">
                    <h3 className="text-lg font-medium mb-2 text-center border-b border-purple-300 pb-2">API Layer</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        React Query
                      </div>
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Supabase Client
                      </div>
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Authentication
                      </div>
                      <div className="border border-purple-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Data Fetching
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow down */}
                  <div className="w-20 h-10 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Backend Layer */}
                  <div className="border-2 border-green-500 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 w-full max-w-xl">
                    <h3 className="text-lg font-medium mb-2 text-center border-b border-green-300 pb-2">Supabase Backend</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        PostgreSQL Database
                      </div>
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Auth Services
                      </div>
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Storage Buckets
                      </div>
                      <div className="border border-green-300 p-2 rounded text-center bg-white dark:bg-gray-800">
                        Realtime Subscriptions
                      </div>
                    </div>
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
                  <div className="border border-dashed border-gray-300 p-4 rounded-lg">
                    <div className="text-center font-medium mb-4">Actor: Pet Adopter</div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs flex items-center justify-center">UC1</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Browse available pets</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs flex items-center justify-center">UC2</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Add pets to favorites</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs flex items-center justify-center">UC3</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">View pet details</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs flex items-center justify-center">UC4</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Submit adoption request</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-light-purple text-pet-dark-purple font-medium text-xs flex items-center justify-center">UC5</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Contact pet owner</div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium mb-2">Pet Owner</h3>
                  <div className="border border-dashed border-gray-300 p-4 rounded-lg">
                    <div className="text-center font-medium mb-4">Actor: Pet Owner</div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs flex items-center justify-center">UC6</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">List pets for adoption</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs flex items-center justify-center">UC7</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Update pet information</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs flex items-center justify-center">UC8</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">View adoption requests</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs flex items-center justify-center">UC9</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Approve/reject requests</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="min-w-6 h-6 rounded-full bg-pet-soft-blue text-blue-700 font-medium text-xs flex items-center justify-center">UC10</div>
                        <div className="border border-gray-200 rounded p-2 flex-1 bg-gray-50 dark:bg-gray-700">Mark pet as adopted</div>
                      </li>
                    </ul>
                  </div>
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
                  
                  {/* UML State Chart */}
                  <div className="flex flex-col items-center">
                    {/* Initial State */}
                    <div className="w-4 h-4 rounded-full bg-black"></div>
                    <div className="h-6 border-l border-black"></div>
                    
                    {/* Available State */}
                    <div className="border-2 border-gray-400 rounded-lg p-3 w-40 text-center mb-6">
                      <div className="font-medium">Available</div>
                    </div>
                    
                    {/* Transition Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="h-6 border-l border-black"></div>
                      <div className="text-xs text-gray-500 mb-1">[User Submits Request]</div>
                      <div className="h-6 border-l border-black"></div>
                    </div>
                    
                    {/* Request Pending State */}
                    <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-44 text-center mb-6">
                      <div className="font-medium">Request Pending</div>
                    </div>
                    
                    {/* Decision Fork */}
                    <div className="flex flex-col items-center">
                      <div className="h-6 border-l border-black"></div>
                      <div className="w-40 border-b-2 border-black"></div>
                    </div>
                    
                    {/* Rejected and Approved States */}
                    <div className="flex gap-40 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="h-6 border-l border-black"></div>
                        <div className="text-xs text-gray-500 mb-1">[Owner Rejects]</div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="border-2 border-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 w-40 text-center">
                          <div className="font-medium">Rejected</div>
                        </div>
                        <div className="h-6 border-l border-black"></div>
                        <svg className="w-16 h-8" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 16H30C30 8 60 8 60 16H64" stroke="black" strokeWidth="1"/>
                          <path d="M60 16L52 12V20L60 16Z" fill="black"/>
                        </svg>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="h-6 border-l border-black"></div>
                        <div className="text-xs text-gray-500 mb-1">[Owner Approves]</div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="border-2 border-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 w-40 text-center">
                          <div className="font-medium">Approved</div>
                        </div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="text-xs text-gray-500 mb-1">[Process Complete]</div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="border-2 border-gray-400 rounded-lg p-3 w-40 text-center">
                          <div className="font-medium">Adopted</div>
                        </div>
                        <div className="h-6 border-l border-black"></div>
                        <div className="w-4 h-4 rounded-full bg-black border-4 border-white dark:border-gray-800"></div>
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
                  
                  {/* UML Activity Diagram */}
                  <div className="flex flex-col items-center">
                    {/* Start Node */}
                    <div className="w-16 h-16 rounded-full bg-black mb-4"></div>
                    <div className="h-8 border-l-2 border-black"></div>
                    
                    <div className="flex gap-36">
                      {/* User Activities */}
                      <div className="flex flex-col items-center">
                        <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">User Browses Pets</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">User Views Pet Details</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        <div className="border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">Submit Adoption Form</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        <svg className="w-48 h-8" viewBox="0 0 192 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M96 0V32" stroke="black" strokeWidth="2"/>
                          <path d="M0 32H192" stroke="black" strokeWidth="2"/>
                        </svg>
                      </div>
                      
                      {/* Owner Activities */}
                      <div className="flex flex-col items-center mt-32">
                        <div className="h-8 border-l-2 border-black"></div>
                        <div className="border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 w-48 text-center mb-4">
                          <div className="font-medium">Owner Reviews Request</div>
                        </div>
                        <div className="h-8 border-l-2 border-black"></div>
                        
                        {/* Decision Diamond */}
                        <div className="w-16 h-16 border-2 border-black rotate-45 mb-6"></div>
                        
                        {/* Fork for Approved/Rejected */}
                        <div className="flex gap-24">
                          <div className="flex flex-col items-center">
                            <div className="h-8 border-l-2 border-black"></div>
                            <div className="text-xs text-gray-500 mb-1">[Rejected]</div>
                            <div className="h-4 border-l-2 border-black"></div>
                            <div className="border-2 border-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 w-40 text-center">
                              <div className="font-medium">Adoption Rejected</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="h-8 border-l-2 border-black"></div>
                            <div className="text-xs text-gray-500 mb-1">[Approved]</div>
                            <div className="h-4 border-l-2 border-black"></div>
                            <div className="border-2 border-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 w-40 text-center mb-4">
                              <div className="font-medium">Adoption Approved</div>
                            </div>
                            <div className="h-8 border-l-2 border-black"></div>
                            <div className="border-2 border-gray-400 rounded-lg p-3 w-40 text-center mb-4">
                              <div className="font-medium">Pet Adoption Finalized</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Join to End Node */}
                    <div className="mt-8">
                      <svg className="w-48 h-8" viewBox="0 0 192 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M96 0V32" stroke="black" strokeWidth="2"/>
                        <path d="M0 0H192" stroke="black" strokeWidth="2"/>
                      </svg>
                      <div className="h-8 border-l-2 border-black ml-24"></div>
                      <div className="w-16 h-16 rounded-full bg-black border-4 border-white dark:border-gray-800 ml-16"></div>
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
