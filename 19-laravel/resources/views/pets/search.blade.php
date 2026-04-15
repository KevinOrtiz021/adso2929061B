@foreach ($pets as $pet)
<tr class="even:bg-white/5">
    <td class="hidden md:table-cell">{{ $pet->id }}</td>
    <td>
        <div class="avatar">
            <div class="mask mask-squircle w-12">
                <img src="{{ asset('images/pets/' . $pet->image) }}" />
            </div>
        </div>
    </td>
    <td class="font-bold">{{ $pet->name }}</td>
    <td class="hidden md:table-cell">{{ $pet->kind }}</td>
    <td class="hidden md:table-cell">{{ $pet->breed }}</td>
    <td>
        @if ($pet->adopted)
            <span class="badge badge-success">Adopted</span>
        @else
            <span class="badge badge-info">Available</span>
        @endif
    </td>
    <td>
        <div class="flex gap-1">
            <a href="{{ url('pets/' . $pet->id) }}" class="btn btn-xs btn-outline btn-default">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
            </a>
            <a href="{{ url('pets/' . $pet->id . '/edit') }}" class="btn btn-xs btn-outline btn-default">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                </svg>
            </a>
        </div>
    </td>
</tr>
@endforeach

@if($pets->count() == 0)
<tr>
    <td colspan="7" class="text-center py-8 text-white">
        No se encontraron mascotas que coincidan con la búsqueda
    </td>
</tr>
@endif