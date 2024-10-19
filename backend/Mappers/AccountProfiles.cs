using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<EditUserDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }

    public class CorporationProfile : Profile
    {
        public CorporationProfile()
        {
            CreateMap<EditCorpDto, Corporation>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
