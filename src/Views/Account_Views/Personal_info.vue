<template>
  <section class="flex-1 p-1 w-full md:w-3/4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 class="text-xl sm:text-2xl font-semibold">Personal information</h1>
      </div>

      <!-- Subtext -->
      <p class="text-gray-500 mt-2 text-sm sm:text-base">
        Manage your personal information, including phone numbers and email address.
      </p>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Full Name</p>
          <p class="text-base sm:text-lg font-semibold">{{ name }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Phone Number</p>
          <p class="text-base sm:text-lg font-semibold">{{ phone }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Email Address</p>
          <p class="text-base sm:text-lg font-semibold">{{ email }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">User ID</p>
          <p class="text-base sm:text-lg font-semibold">{{ userid }}</p>
        </div>
        <div class="col-span-1 md:col-span-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-sm">Account Balance</p>
          <p class="text-base sm:text-lg font-semibold">ikakodesign@gmail.com</p>
        </div>
      </div>
    </div>
  </section>
</template>
